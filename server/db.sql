CREATE DATABASE money_manager;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_phone VARCHAR(11) NOT NULL,
    user_address VARCHAR(255),
    user_password VARCHAR(255) NOT NULL

)
CREATE TABLE category (
    id SERIAL PRIMARY KEY NOT NULL,
    category_name VARCHAR(255) NOT NULL,
    user_category BOOLEAN DEFAULT(FALSE),
    user_id uuid
)
CREATE TABLE expense_type(
    id SERIAL PRIMARY KEY NOT NULL,
    type_name VARCHAR(50)
)
CREATE TABLE money_expense (
    id SERIAL NOT NULL,
    expense_type_id INT NOT NULL,
    user_id uuid NOT NULL,
    category_id INT NOT NULL,
    money_amount BIGINT NOT NULL,
    note VARCHAR(500),
    detail VARCHAR (1000),
    date_created timestamp,
	PRIMARY KEY(id,user_id)
)

