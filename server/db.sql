CREATE DATABASE money_manager;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users(
    user_id uuid NOT NULL DEFAULT uuid_generate_v4(),
    user_name character varying(255) COLLATE pg_catalog."default",
    user_email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    user_phone character varying(11) COLLATE pg_catalog."default",
    user_address character varying(255) COLLATE pg_catalog."default",
    user_password character varying(255) COLLATE pg_catalog."default" NOT NULL,
    is_admin boolean,
    activated boolean,
    trial_expired time without time zone,
    CONSTRAINT users_pkey PRIMARY KEY (user_id)

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
    id SERIAL PRIMARY KEY NOT NULL,
    expense_type_id integer NOT NULL,
    user_id uuid NOT NULL,
    category_id integer NOT NULL,
    money_amount bigint NOT NULL,
    note character varying(500) COLLATE pg_catalog."default",
    detail character varying(1000) COLLATE pg_catalog."default",
    date_created timestamp without time zone,
    method integer,
)

CREATE TABLE public.expense_method
(
    method_name character varying(50) COLLATE pg_catalog."default",
    id SERIAL PRIMARY KEY NOT NULL
)

-- CREATE VIEW money_expense_detail
CREATE OR REPLACE VIEW public.money_expense_detail
 AS
 SELECT money_expense.id,
    money_expense.expense_type_id,
    money_expense.user_id,
    money_expense.category_id,
    money_expense.money_amount,
    money_expense.note,
    money_expense.detail,
    money_expense.date_created,
    money_expense.method,
    expense_type.type_name,
    category.category_name,
    expense_method.method_name
   FROM money_expense
     JOIN expense_type ON expense_type.id = money_expense.expense_type_id
     JOIN category ON category.id = money_expense.category_id
     JOIN expense_method ON expense_method.id = money_expense.method;

ALTER TABLE public.money_expense_detail
    OWNER TO postgres;
