CREATE DATABASE money_manager;

CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_phone VARCHAR(11) NOT NULL,
    user_address VARCHAR(255),
    user_password VARCHAR(255) NOT NULL

)