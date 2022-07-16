-- Create products table
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE products (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    name varchar(50) NOT NULL UNIQUE,
    description varchar(255)NOT NULL,
    price integer NOT NULL,
    category varchar(50) 
);