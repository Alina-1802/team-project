use std::sync::Arc;
use axum::{
    extract::{Path, State, Request},
    http::StatusCode,
    routing::{get, patch},
    Json, Router, Extension,
};
use axum::routing::{connect, post, Route};
use serde::{Serialize, Deserialize};
use serde_json::json;
use argon2::{Argon2, password_hash::{SaltString, PasswordHasher, PasswordVerifier}, PasswordHash};
use async_trait::async_trait;
use dotenvy::dotenv;
use jsonwebtoken::{encode, decode, EncodingKey, DecodingKey, Header, Validation};
use sqlx::{query, sqlite::{SqlitePoolOptions, SqlitePool}};
use tokio::net::TcpListener;
use axum::{response::IntoResponse};
use axum::extract::OptionalFromRequest;
use validator::{Validate, ValidationErrors};



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
        .layer(Extension(Arc::new(db_pool)));

    axum::serve(listener,app).await.expect("Error serving application")
}

#[derive(Deserialize,Validate)]
struct RegisterRequest {
    #[validate(length(min = 3, max = 30, message = "Username must be between 3 and 30 characters"))]
    username: String,
    #[validate(length(min = 8, message = "Password must be at least 8 characters long"))]
    // #[validate(regex = "r#\"^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$\"#", message = "Password must contain at least one letter and one number")]
    password: String,
}

#[derive(Serialize)]
struct ApiResponse {
    success: bool,
    message: String,
}

async fn register_user(
    Extension(pool): Extension<Arc<SqlitePool>>,
    Json(payload): Json<RegisterRequest>,
) -> impl IntoResponse {
    if let Err(error) = validate_register_request(&payload) {
        let response = ApiResponse {
            success: false,
            message: format!("Validation error: {}", error),
        };
        return (StatusCode::UNPROCESSABLE_ENTITY, Json(response));
    }

    let salt = SaltString::generate(&mut rand::thread_rng());
    let password_hash = Argon2::default()
        .hash_password(payload.password.as_bytes(), &salt)
        .expect("Failed to hash password")
        .to_string();

    let result = query!(
        "INSERT INTO users (username, password_hash) VALUES (?, ?)",
        payload.username,
        password_hash
    )
        .execute(&*pool)
        .await;

    match result {
        Ok(_) => {
            let response = ApiResponse {
                success: true,
                message: "User registered successfully".to_string(),
            };
            (StatusCode::CREATED, Json(response))
        }
        Err(err) => {
            let response = ApiResponse {
                success: false,
                message: format!("Failed to register user: {:?}", err),
            };
            (StatusCode::INTERNAL_SERVER_ERROR, Json(response))
        }
    }
}

#[derive(Deserialize,Validate)]
struct LoginRequest {
    username: String,
    password: String,
}

#[derive(Serialize)]
struct LoginResponse {
    token: String,
}

async fn login_user(
    Extension(pool): Extension<Arc<SqlitePool>>,
    Json(payload): Json<LoginRequest>,
) -> Result<Json<LoginResponse>, Json<String>> {
    let user = query!(
        "SELECT password_hash FROM users WHERE username = ?",
        payload.username
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
                let claims = serde_json::json!({ "sub": payload.username });
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

#[derive(Debug, Serialize, Deserialize)]
struct Claims {
    sub: String,
    exp: usize,
}

fn validate_register_request(req: &RegisterRequest) -> Result<(), String> {
    if req.username.len() < 3 {
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
