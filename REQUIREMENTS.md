# SHOPLY

## _Storefront Api_

> **Table of content**

- [API End points](#-api-routes)
  - [`Users routes`](#-users-route 'Users Routes')
  - [`Products routes`](#-products-route 'Products Routes')
  - [`Orders routes`](#-orders-route 'Orders Routes')
- [Database schema](#-database-schema)
  - [`users Schema`](#-users-table 'Database table users schema')
  - [`products Schema`](#-products-table 'Database table products schema')
  - [`orders Schema`](#-orders-table 'Database table orders schema')
  - [`order_products Schema`](#-order-products-table 'Database orders_products schema')

# Project Information

## API Routes

## Users Route

| Route             |  Methods   | Description                           | Requirements      | Request Body Example                                                                                                   |
| ----------------- | :--------: | ------------------------------------- | ----------------- | :--------------------------------------------------------------------------------------------------------------------- |
| **`/users`**      |  `[GET]`   | **Index** of users with users list,   | User token        | -                                                                                                                      |
| **`/users/:id`**  |  `[GET]`   | **Show** single user using _[**id**]_ | User token        | `id`                                                                                                                   |
| **`/users/auth`** |  `[POST]`  | **Authenticate** a user               | No token required | `{"email": "shimaa@test.com", "password": "123456"}`                                                                   |
| **`/users`**      |  `[POST]`  | **Create** a new user                 | No token required | `{"email": "shimaa@test.com", "user_name": "shimaa""first_name": "shimaa", "last_name": "adel", "password": "123456"}` |
| **`/users/:id`**  | `[PATCH]`  | **Update** a user                     | User token        | `{"id": "39f98a9c-2661-46df-b067-7ad2ed5a94d6"}`                                                                       |
| **`/users/:id`**  | `[DELETE]` | **delete** a user                     | User token        | `{"id": "39f98a9c-2661-46df-b067-7ad2ed5a94d6"}`                                                                       |

## Products Route

| Route               | Methods  | Description                               | Requirements | Request Body Example                                                                                 |
| ------------------- | :------: | ----------------------------------------- | ------------ | ---------------------------------------------------------------------------------------------------- |
| **`/products`**     | `[GET]`  | **Index** of products with products list, | User token   | -                                                                                                    |
| **`/products/:id`** | `[GET]`  | **Show** single product using _[**id**]_  | User token   | `id`                                                                                                 |
| **`/products`**     | `[POST]` | **Create** a new product                  | User token   | `{ "name": "product 1","description": "product 1 description","price": 50,"category": "essentials"}` |

## Orders Route

| Route             | Methods  | Description                            | Requirements | Request Body Example                                                                    |
| ----------------- | :------: | -------------------------------------- | ------------ | --------------------------------------------------------------------------------------- |
| **`/orders`**     | `[GET]`  | **Index** of orders with orders list   | User token   | -                                                                                       |
| **`/orders/:id`** | `[GET]`  | **Show** single order using _[**id**]_ | User token   | `id`                                                                                    |
| **`/orders`**     | `[POST]` | **Make** a new order                   | User token   | `{"user_id": "39f98a9c-2661-46df-b067-7ad2ed5a94d6", "status": "active","quantity": 5}` |

## Database schema

## Users table

| Column name      |   Data Type    | Constraints     | References |
| ---------------- | :------------: | --------------- | ---------- |
| **`id`**         |     `uuid`     | **PRIMARY KEY** | -          |
| **`email`**      | `VARCHAR(50)`  | **_UNIQUE_**    | -          |
| **`user_name`**  | `VARCHAR(50)`  | **NOT NULL**    | -          |
| **`first_name`** | `VARCHAR(25)`  | **NOT NULL**    | -          |
| **`last_name`**  | `VARCHAR(25)`  | **NOT NULL**    | -          |
| **`password`**   | `VARCHAR(255)` | **NOT NULL**    | -          |

## Products table

| Column name       |   Data Type    | Constraints               | References |
| ----------------- | :------------: | ------------------------- | ---------- |
| **`id`**          |     `uuid`     | **PRIMARY KEY**           | -          |
| **`name`**        | `VARCHAR(50)`  | **NOT NULL** , **UNIQUE** | -          |
| **`description`** | `VARCHAR(255)` | **NOT NULL**              | -          |
| **`price`**       |     `INT`      | **NOT NULL**              | -          |
| **`category`**    | `VARCHAR(50)`  |                           | -          |

## Orders table

| Column name    |   Data Type   | Constraints     | References                                             |
| -------------- | :-----------: | --------------- | ------------------------------------------------------ |
| **`id`**       |    `uuid`     | **PRIMARY KEY** | -                                                      |
| **`user_id`**  |    `uuid`     |                 | **users(id)**, **FOREIGN KEY** ( ON _DELETE_ CASCADE ) |
| **`status`**   | `VARCHAR(50)` |                 | -                                                      |
| **`quantity`** |     `INT`     | **NOT NULL**    | -                                                      |

## Order products table

| Column name      | Data Type | Constraints               | References                                               |
| ---------------- | :-------: | ------------------------- | -------------------------------------------------------- |
| **`id`**         |  `uuid`   | **PRIMARY KEY**           | -                                                        |
| **`order_id`**   |  `uuid`   | **NOT NULL** , **UNIQUE** | **orders(id)**, **FOREIGN KEY** ( ON _DELETE_ CASCADE)   |
| **`product_id`** |  `uuid`   | **NOT NULL**              | **products(id)**, **FOREIGN KEY** ( ON _DELETE_ CASCADE) |
| **`price`**      |   `INT`   | **NOT NULL**              | -                                                        |

## License

MIT
**Shimaa Adel | UDACITY**
