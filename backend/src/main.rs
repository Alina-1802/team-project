mod auth;

use std::sync::Arc;
use std::usize::MAX;
use axum::{extract::{FromRequestParts, Path, State, Request}, http::StatusCode, routing::{get, patch}, Json, Router, Extension, middleware};
use axum::routing::{connect, post, Route};
use serde::{Serialize, Deserialize};
use serde_json::{json, to_string, Value};
use argon2::{Argon2, password_hash::{SaltString, PasswordHasher, PasswordVerifier}, PasswordHash};
use async_trait::async_trait;
use dotenvy::dotenv;
use jsonwebtoken::{encode, decode, EncodingKey, DecodingKey, Header, Validation, Algorithm};
use sqlx::{query, sqlite::{SqlitePoolOptions, SqlitePool}};
use tokio::net::TcpListener;
use axum::{response::IntoResponse};
use axum::body::Body;
use axum::extract::OptionalFromRequest;
use axum::http::header;
use axum::http::request::Parts;
use axum::middleware::Next;
use axum::response::Response;
use headers::{Authorization, HeaderMapExt};
use headers::authorization::Bearer;
use validator::{Validate, ValidationErrors};
use axum_extra::TypedHeader;



#[tokio::main]
async fn main() {
    dotenv().ok();

    let server_address = std::env::var("SERVER_ADDRESS").unwrap_or("127.0.0.1:3000".to_owned());
    let database_url = std::env::var("DATABASE_URL").expect("Nie znalezionowo bazy danych");
    let db_pool = SqlitePoolOptions::new()
        .max_connections(16)
        .connect(&database_url)
        .await.expect("Can't connect to database");

    let listener = TcpListener::bind(server_address)
        .await
        .expect("Could not create TCP Listener");

    let app = Router::new()
        .route("/register", post(register_user))
        .route("/login", post(login_user))
        // .route("/update-account", patch(update_user::<Body>)/*.route_layer(middleware::from_fn(auth_middleware::<Body>))*/)
        .route("/get-user", get(get_user).route_layer(middleware::from_fn(auth_middleware::<Body>)))
        .layer(Extension(Arc::new(db_pool)));


    axum::serve(listener,app).await.expect("Error serving application")
}

#[derive(Deserialize,Validate)]
struct RegisterRequest {
    #[validate(email(message = "Invalid email format"))]
    #[validate(length(min = 10, max = 50, message = "Email must be between 10 and 50 characters"))]
    email: String,
    #[validate(length(min = 8, message = "Password must be at least 8 characters long"))]
    password: String,
}

#[derive(Serialize)]
struct ApiResponse {
    success: bool,
    message: String,
    data: Vec<Value>
}
#[derive(Deserialize,Validate)]
struct LoginRequest {
    email: String,
    password: String,
}

#[derive(Serialize)]
struct LoginResponse {
    token: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct Claims {
  pub sub: String,
  pub exp: usize,
}
struct AuthenticatedUser {
    pub id: String,
}
#[derive(Debug, Serialize, Deserialize)]
struct UpdateUserRequest {
    pub username: Option<String>,
    pub first_name: Option<String>,
    pub last_name: Option<String>,
}
#[derive(Debug, Serialize, Deserialize)]
struct GetUserDataResponse {
    pub username: String,
    pub first_name: String,
    pub last_name: String,
    pub email: String,
}

async fn register_user (
    Extension(pool): Extension<Arc<SqlitePool>>,
    Json(payload): Json<RegisterRequest>,
) -> impl IntoResponse  {
    if let Err(error) = validate_register_request(&payload) {
        let response : ApiResponse = ApiResponse {
            success: false,
            message: format!("Validation error: {}", error),
            data: Vec::new(),
        };
        return (StatusCode::UNPROCESSABLE_ENTITY, Json(response));
    }

    let salt = SaltString::generate(&mut rand::thread_rng());
    let password_hash = Argon2::default()
        .hash_password(payload.password.as_bytes(), &salt)
        .expect("Failed to hash password")
        .to_string();

    let result = query!(
        "INSERT INTO users (email, password_hash) VALUES (?, ?)",
        payload.email,
        password_hash
    )
        .execute(&*pool)
        .await;

    match result {
        Ok(_) => {
            let response = ApiResponse {
                success: true,
                message: "User registered successfully".to_string(),
                data: Vec::new(),
            };
            (StatusCode::CREATED, Json(response))
        }
        Err(err) => {
            let response = ApiResponse {
                success: false,
                message: format!("Failed to register user: {:?}", err),
                data: Vec::new(),
            };
            (StatusCode::INTERNAL_SERVER_ERROR, Json(response))
        }
    }
}

pub async fn login_user(
    Extension(pool): Extension<Arc<SqlitePool>>,
    Json(payload): Json<LoginRequest>,
) -> Result<Json<LoginResponse>, Json<String>> {
    let user = query!(
        "SELECT password_hash FROM users WHERE email = ?",
        payload.email
    )
        .fetch_one(&*pool)
        .await;

    match user {
        Ok(user) => {
            let parsed_hash = PasswordHash::new(&user.password_hash).unwrap();
            if Argon2::default()
                .verify_password(payload.password.as_bytes(), &parsed_hash)
                .is_ok()
            {
                let claims = Claims { sub: payload.email, exp: usize::MAX};
                let claims = serde_json::json!(claims);
                let token = encode(
                    &Header::default(),
                    &claims,
                    &EncodingKey::from_secret("your_secret_key".as_bytes()),
                )
                    .unwrap();

                Ok(Json(LoginResponse { token }))
            } else {
                Err(Json("Invalid username or password".into()))
            }
        }
        Err(_) => Err(Json("Invalid username or password".into())),
    }
}
pub fn validate_register_request(req: &RegisterRequest) -> Result<(), String> {
    if req.email.len() < 3 {
        return Err("Username must be at least 3 characters long".to_string());
    }

    if req.password.len() < 8 {
        return Err("Password must be at least 8 characters long".to_string());
    }

    Ok(())
}
fn verify_token(token: &str) -> Result<Claims, jsonwebtoken::errors::Error> {
    decode::<Claims>(
        token,
        &DecodingKey::from_secret("your_secret_key".as_bytes()),
        &Validation::default(),
    )
        .map(|data| data.claims)
}
pub async fn auth_middleware<B>(
    mut req: Request<Body>,
    next: Next
) -> Result<Response, (StatusCode, &'static str)> {
    let headers = req.headers();

    let authorization = headers
        .typed_get::<Authorization<headers::authorization::Bearer>>()
        .ok_or((StatusCode::UNAUTHORIZED, "Missing Authorization header"))?;

    let mut auth_data = authorization.token()
        .split(" ")
        .collect::<Vec<&str>>();
    let token= auth_data.pop()
        .ok_or( (StatusCode::UNAUTHORIZED, "Invalid or expired token"))?;


    let decoding_key = DecodingKey::from_secret("your_secret_key".as_bytes());
    let token_data = decode::<Claims>(
        token,
        &decoding_key,
        &Validation::new(Algorithm::HS256),
    ).map_err(|_| (StatusCode::UNAUTHORIZED, "Invalid or expired token123"))?;

     req.extensions_mut().insert(token_data.claims.sub);

    Ok(next.run(req).await)
}
pub async fn update_user<Body>(
    Extension(pool): Extension<Arc<SqlitePool>>,
    Json(payload): Json<UpdateUserRequest>,
) -> impl IntoResponse {

    if payload.first_name.is_none() && payload.last_name.is_none() && payload.username.is_none() {
        let response = ApiResponse {
            success: false,
            message: "No fields to update".to_string(),
            data: Vec::new(),
        };
        // return (StatusCode::BAD_REQUEST, Json(response));
    }

    let mut query_string = String::from("UPDATE users SET ");
    let mut params: Vec<String> = Vec::new();

    // if let Some(first_name) = &payload.first_name {
    //     query_string.push_str("first_name = ?, ");
    //     params.push(first_name.clone());
    // }
    //
    // if let Some(last_name) = &payload.last_name {
    //     query_string.push_str("last_name = ?, ");
    //     params.push(last_name.clone());
    // }
    //
    // if let Some(username) = &payload.username {
    //     query_string.push_str("username = ?, ");
    //     params.push(username.clone());
    // }

    query_string.pop();
    query_string.pop();

    query_string.push_str(" WHERE email = ?;");
    let  email = "123".to_string()/*req.extensions().get::<String>().expect("REASON").to_string()*/;
    params.push(email);


    let result = sqlx::query(&query_string)
        .bind(&params[0])
        .bind(&params[1])
        .bind(&params[2])
        .bind(&params[3])
        .execute(&*pool)
        .await;

    match result {
        Ok(_) => {
            let response : ApiResponse = ApiResponse {
                success: true,
                message: "User updated successfully".to_string(),
                data: Vec::new(),
            };
            (StatusCode::OK, Json(response))
        }
        Err(err) => {
            let response = ApiResponse {
                success: false,
                message: format!("Failed to update user: {:?}", err),
                data: Vec::new(),
            };
            (StatusCode::INTERNAL_SERVER_ERROR, Json(response))
        }
    }
}
pub async fn get_user(
    Extension(pool): Extension<Arc<SqlitePool>>,
    TypedHeader(authorization): TypedHeader<Authorization<headers::authorization::Bearer>>,
    mut req: Request<Body>,
) -> impl IntoResponse {
    let email = req.extensions().get::<String>();

    let user = query!(
        "SELECT username,first_name,last_name,email FROM users WHERE email = ?",
        email
    )
        .fetch_one(&*pool)
        .await;

    match user {
        Ok(user) => {
            let user_data: Vec<Value> = vec![
                serde_json::json!({
                    "username": user.username,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "email": user.email
                })
            ];
            let response = ApiResponse {
                success: true,
                message: "User found".to_string(),
                data: user_data,
            };
            (StatusCode::OK, Json(response))

        }
        Err(err) => {
            let response = ApiResponse {
                success: false,
                message: format!("User not found: {:?}", err),
                data: Vec::new(),
            };
            (StatusCode::INTERNAL_SERVER_ERROR, Json(response))
        }
    }
}
