# SHOPLY - Storefront Backend Project

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `yarn` in your terminal at the project root.

## Required Technologies

Your application must make use of the following libraries:

- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## 1. Installation Instructions

This section contains all the packages used in this project and how to install them. However, you can fork this repo and run the following command at the root directory to install all packages.

`yarn` or `npm install`

### Packages

Here are some of the few packages that were installed.

#### express

`npm i -S express`
`npm i -D @types/express`

#### typescript

`npm i -D typescript`

#### db-migrate

`npm install -g db-migrate`

#### g

`npm install -g n`

#### rimraf

`npm install --save rimraf`

#### cors

`npm install --save cors`

#### bcrypt

`npm -i bcrypt`
`npm -i -D @types/bcrypt`

#### morgan

`npm install --save morgan`
`npm -i -D @types/morgan`

#### jsonwebtoken

`npm install jsonwebtoken --sav`
`npm -i -D @types/jsonwebtoken`

#### cross-env

`npm install --save-dev cross-env`

#### jasmine

`npm install jasmine @types/jasmine @ert78gb/jasmine-ts ts-node --save-dev`

#### supertest

`npm i supertest`
`npm i --save-dev @types/supertest`

### 2. DB Creation and Migrations

## Set up Database

### Create Databases

We shall create the dev and test database.

- connect to the default postgres database as the server's root user `psql -U postgres`

- In psql run the following to create the dev and test database
  - `CREATE DATABASE shoply_dev;`
  - `CREATE DATABASE shoply_test;`

### Migrate Database

Navigate to the root directory and run the command below to migrate the database

`yarn migration:run`

## Enviromental Variables Set up

Bellow are the environmental variables that needs to be set in a `.env` file, a `.env.example` file with all variables is available in the repo. This is the default setting that I used for development, make sute to change it with your settings.

**NB:** The given values are used in developement and testing but not in production.

```
PORT=3000
NODE_ENV=dev
# DB connection
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=shoply_dev
POSTGRES_DB_TEST=shoply_test
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
BCRYPT_PASSWORD=sh-password
SALT_ROUNDS=10
TOKEN_SECRET=sh-token
```

## Start App

`yarn start` or `npm run start`

### Running Ports

After start up, the server will start on port `3000` and the database on port `5432`

## Endpoint Access

All endpoints are described in the [REQUIREMENT.md](REQUIREMENTS.md) file.

## Token and Authentication

Tokens are passed along with the http header as

```
Authorization   Bearer <token>
```

## Testing

Run test with

`yarn test`

It sets the environment to `test`, migrates up tables for the test database, run the test then migrate down all the tables for the test database.

## Important Notes

### Environment Variables

Environment variables are set in the `.env` file and added in `.gitignore` so that it won't be added to github. However, I provided an .env.example in the repo with the names of the variables that need to be set along with example above.

### Changing Enviroment to testing

I had set up two databases, one for development and the other for testing. During testing, I had to make sure the testing database is used instead of the developement database.

To acheive this, I set up a variable in the `.env` file which is by default set to `dev`. During testing, the command `yarn test` will set this variable to `test` in the package.json. Here is the complete command.

`tsc && set NODE_ENV=test&& db-migrate --env test up && jasmine && db-migrate --env test reset`
