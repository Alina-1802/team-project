use std::collections::HashMap;
use std::sync::Arc;
use std::usize::MAX;
use axum::{extract::{FromRequestParts, Path, State, Request}, http::StatusCode, routing::{get, patch}, Json, Router, Extension, middleware};
use axum::routing::{connect, post, Route};
use serde::{Serialize, Deserialize};
use serde_json::{json, to_string, to_string_pretty, Value};
use argon2::{Argon2, password_hash::{SaltString, PasswordHasher, PasswordVerifier}, PasswordHash};
use async_trait::async_trait;
use dotenvy::dotenv;
use jsonwebtoken::{encode, decode, EncodingKey, DecodingKey, Header, Validation, Algorithm};
use sqlx::{query, sqlite::{SqlitePoolOptions, SqlitePool}};
use tokio::net::TcpListener;
use axum::{response::IntoResponse};
use axum::body::Body;
use axum::extract::{OptionalFromRequest, Query};
use axum::http::header;
use axum::http::request::Parts;
use axum::middleware::Next;
use axum::response::Response;
use headers::{Authorization, Date, HeaderMapExt};
use headers::authorization::Bearer;
use validator::{Validate};
use axum_extra::TypedHeader;
use tower_http::cors::{CorsLayer, Any};
use chrono::{DateTime, NaiveDateTime};


#[tokio::main]
async fn main() {
    dotenv().ok();

    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods(Any)
        .allow_headers(Any);
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
        .route("/update-account", post(update_user).route_layer(middleware::from_fn(auth_middleware::<Body>)))
        .route("/get-user", get(get_user).route_layer(middleware::from_fn(auth_middleware::<Body>)))
        .route("/store-quiz-result", post(store_quiz_result).route_layer(middleware::from_fn(auth_middleware::<Body>)))
        .route("/get-quiz-results", get(get_quiz_results).route_layer(middleware::from_fn(auth_middleware::<Body>)))
        .layer(Extension(Arc::new(db_pool)))
        .layer(cors);


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

#[derive(Deserialize,Serialize)]
struct ApiResponse <T> {
    success: bool,
    message: String,
    data: T
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
#[derive(Debug, Serialize, Deserialize)]
struct UpdateUserRequest {
    pub username: Option<String>,
    pub first_name: Option<String>,
    pub last_name: Option<String>,
}
#[derive(Debug, Serialize, Deserialize)]
struct QuizStoreResultRequest {
    pub quiz_id: Option<String>,
    pub scored_points: Option<String>,
    pub quiz_date: Option<String>
}
#[derive(Debug, Serialize, Deserialize)]
struct QuizGetResultRequest {
    pub quiz_id: Option<String>,
}
#[derive(Serialize,Debug, sqlx::FromRow)]
struct ScoredPoints {
    scored_points: i64,
    created_at: Option<NaiveDateTime>,
    pub quiz_id: i64,
}
async fn register_user (
    Extension(pool): Extension<Arc<SqlitePool>>,
    Json(payload): Json<RegisterRequest>,
) -> impl IntoResponse  {
    if let Err(error) = validate_register_request(&payload) {
        let response : ApiResponse::<Vec<()>> = ApiResponse {
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
) -> impl IntoResponse {
    let user = query!(
        "SELECT password_hash FROM users WHERE email = ?",
        payload.email
    )
        .fetch_one(&*pool)
        .await;

    return match user {
        Ok(user) => {
            let parsed_hash = PasswordHash::new(&user.password_hash).unwrap();
            if Argon2::default()
                .verify_password(payload.password.as_bytes(), &parsed_hash)
                .is_ok()
            {
                let claims = Claims { sub: payload.email, exp: usize::MAX };
                let claims = serde_json::json!(claims);
                let token = encode(
                    &Header::default(),
                    &claims,
                    &EncodingKey::from_secret("your_secret_key".as_bytes()),
                )
                    .unwrap();

                let mut tokens: HashMap<String, String> = HashMap::new();
                tokens.insert("token".to_string(), token);
                let response = ApiResponse {
                    success: true,
                    message: "Successful login".to_string(),
                    data: tokens,
                };
                (StatusCode::OK, Json(response))
            } else {
                // let tokens: HashMap<String, String> = ;
                let response = ApiResponse {
                    success: false,
                    message: "Invalid username or password".to_string(),
                    data: HashMap::new(),
                };
                (StatusCode::UNAUTHORIZED, Json(response))
            }
        }
        Err(_) => {
            let response =  ApiResponse {
                success: false,
                message: "Invalid username or password".to_string(),
                data: HashMap::new(),
            };
            (StatusCode::UNAUTHORIZED, Json(response))
        }
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
// fn verify_token(token: &str) -> Result<Claims, jsonwebtoken::errors::Error> {
//     decode::<Claims>(
//         token,
//         &DecodingKey::from_secret("your_secret_key".as_bytes()),
//         &Validation::default(),
//     )
//         .map(|data| data.claims)
// }
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
    ).map_err(|_| (StatusCode::UNAUTHORIZED, "Invalid or expired token"))?;

     req.extensions_mut().insert(token_data.claims.sub);

    Ok(next.run(req).await)
}
pub async fn update_user(
    Extension(pool): Extension<Arc<SqlitePool>>,
    Extension(user_email): Extension<String>,
    Json(payload): Json<UpdateUserRequest>,
) -> impl IntoResponse {
    let empty_hash_map: HashMap<String, String> = HashMap::new();
    if payload.first_name.is_none() && payload.last_name.is_none() && payload.username.is_none() {
        let response = ApiResponse {
            success: false,
            message: "No fields to update".to_string(),
            data: empty_hash_map,
        };
         return (StatusCode::BAD_REQUEST, Json(response));
    }

    let mut query_string = String::from("UPDATE users SET ");
    let mut params: Vec<String> = Vec::new();

    if let Some(first_name) = &payload.first_name {
        query_string.push_str("first_name = ?, ");
        params.push(first_name.clone());
    }

    if let Some(last_name) = &payload.last_name {
        query_string.push_str("last_name = ?, ");
        params.push(last_name.clone());
    }

    if let Some(username) = &payload.username {
        query_string.push_str("username = ?, ");
        params.push(username.clone());
    }

    query_string.pop();
    query_string.pop();

    query_string.push_str(" WHERE email = ?;");
    params.push(user_email);


    let result = sqlx::query(&query_string)
        .bind(&params[0])
        .bind(&params[1])
        .bind(&params[2])
        .bind(&params[3])
        .execute(&*pool)
        .await;

    match result {
        Ok(_) => {
            let response = ApiResponse {
                success: true,
                message: "User updated successfully".to_string(),
                data: empty_hash_map,
            };
           return (StatusCode::OK, Json(response))
        }
        Err(err) => {
            let response = ApiResponse {
                success: false,
                message: format!("Failed to update user: {:?}", err),
                data: empty_hash_map,
            };
           return (StatusCode::INTERNAL_SERVER_ERROR, Json(response))
        }
    }
}
pub async fn get_user(
    Extension(pool): Extension<Arc<SqlitePool>>,
    TypedHeader(authorization): TypedHeader<Authorization<headers::authorization::Bearer>>,
    mut req: Request<Body>,
) -> impl IntoResponse {
    let empty_hash_map: HashMap<String, String> = HashMap::new();
    let email = req.extensions().get::<String>();
    let user = query!(
        "SELECT username,first_name,last_name,email FROM users WHERE email = ?",
        email
    )
        .fetch_one(&*pool)
        .await;

    match user {
        Ok(user) => {
            let mut user_data: HashMap<String, String> = HashMap::new();
            user_data.insert("username".to_string(), user.username.unwrap_or("Anonim".to_string()));
            user_data.insert("first_name".to_string(), user.first_name.unwrap_or("Anonim".to_string()));
            user_data.insert("last_name".to_string(), user.last_name.unwrap_or("Anonim".to_string()));
            user_data.insert("email".to_string(), user.email);

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
                data: empty_hash_map,
            };
            (StatusCode::INTERNAL_SERVER_ERROR, Json(response))
        }
    }
}
pub async  fn store_quiz_result(
    Extension(pool): Extension<Arc<SqlitePool>>,
    Extension(user_email): Extension<String>,
    Json(payload): Json <QuizStoreResultRequest>
) -> impl IntoResponse   {
    let empty_hash_map: HashMap<String, String> = HashMap::new();
    if payload.quiz_id.is_none() || payload.scored_points.is_none() {
        let response = ApiResponse {
            success: false,
            message: "Incomplete payload ".to_string(),
            data: empty_hash_map,
        };
        return (StatusCode::BAD_REQUEST, Json(response));
    }

    let result = query!("SELECT user_id FROM users WHERE email = ?", user_email)
        .fetch_one(&*pool)
        .await;

    let user_id = match result {
        Ok(record) => match record.user_id {
            Some(id) => id,
            None => {
                let response = ApiResponse {
                    success: false,
                    message: "User ID not found for this email".to_string(),
                    data: empty_hash_map,
                };
                return (StatusCode::NOT_FOUND, Json(response));
            }
        },
        Err(err) => {
            let response =  ApiResponse {
                success: false,
                message: format!("User not found: {:?}", err),
                data: empty_hash_map,
            };
            return (StatusCode::INTERNAL_SERVER_ERROR, Json(response));
        }
    };

    let parsed_datetime = DateTime::parse_from_rfc3339(&payload.quiz_date.clone().unwrap())
        .ok()
        .map(|dt| dt.naive_utc());

    let result = query!(
        "INSERT INTO quiz_result (quiz_id, user_id, scored_points, created_at) VALUES (?, ?, ?, ?)",
        payload.quiz_id,
        user_id,
        payload.scored_points,
        parsed_datetime
    )
        .execute(&*pool)
        .await;

    match result {
        Ok(_) => {
            let response = ApiResponse {
                success: true,
                message: "Result was successfully added".to_string(),
                data: empty_hash_map,
            };
            (StatusCode::CREATED, Json(response))
        }
        Err(err) => {
            let response = ApiResponse {
                success: false,
                message: format!("Failed to add result: {:?}", err),
                data: empty_hash_map,
            };
            (StatusCode::INTERNAL_SERVER_ERROR, Json(response))
        }
    }

}

pub async fn get_quiz_results(
    Extension(pool): Extension<Arc<SqlitePool>>,
    Extension(user_email): Extension<String>,
    Query(payload): Query<QuizGetResultRequest>,
)
    -> impl IntoResponse {

    let result = query!("SELECT user_id FROM users WHERE email = ?", user_email)
        .fetch_one(&*pool)
        .await;

    let user_id = match result {
        Ok(record) => match record.user_id {
            Some(id) => id,
            None => {
                let response = ApiResponse {
                    success: false,
                    message: "User ID not found for this email".to_string(),
                    data: Vec::new(),
                };
                return (StatusCode::NOT_FOUND, Json(response));
            }
        },
        Err(err) => {
            let response = ApiResponse {
                success: false,
                message: format!("User not found: {:?}", err),
                data: Vec::new(),
            };
            return (StatusCode::INTERNAL_SERVER_ERROR, Json(response));
        }
    };

    let quiz_results = if payload.quiz_id.is_none() {
        sqlx::query_as!(
        ScoredPoints,
        "SELECT scored_points,quiz_id, created_at FROM quiz_result WHERE user_id = ?",
        user_id
    )
            .fetch_all(&*pool)
            .await
    } else {
        sqlx::query_as!(
        ScoredPoints,
        "SELECT scored_points,quiz_id, created_at FROM quiz_result WHERE user_id = ? AND quiz_id = ?",
        user_id,
        payload.quiz_id
    )
            .fetch_all(&*pool)
            .await
    };

    return match quiz_results {
        Ok(results) => {
            let mut result_map: HashMap<i64, (String, String)> = HashMap::new();
            let response_data = results
                .into_iter()
                .map(|record| ScoredPoints {
                    scored_points: record.scored_points,
                    created_at: record.created_at,
                    quiz_id: record.quiz_id,
                })
                .collect();

            let response = ApiResponse {
                success: true,
                message: "Test approaches found".to_string(),
                data: response_data,
            };
            (StatusCode::OK, Json(response))
        }
        Err(err) => {
            let response = ApiResponse {
                success: false,
                message: format!("Błąd zapytania do bazy danych: {:?}", err),
                data: Vec::new(),
            };
            (StatusCode::INTERNAL_SERVER_ERROR, Json(response))
        }
    };
}

