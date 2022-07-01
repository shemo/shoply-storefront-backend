import dotenv from 'dotenv'

dotenv.config()

const {
  PORT,
  NODE_ENV,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_DB,
  POSTGRES_DB_TEST,
  POSTGRES_USER,
  POSTGRESS_PASSWORD
} = process.env

export default {
  port: PORT,
  host: POSTGRES_HOST,
  databasePort: POSTGRES_PORT,
  database: NODE_ENV === 'dev' ? POSTGRES_DB : POSTGRES_DB_TEST,
  user: POSTGRES_USER,
  password: POSTGRESS_PASSWORD
}
