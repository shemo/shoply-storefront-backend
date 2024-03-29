import db from '../database'
import User from '../types/user.type'
import config from '../config'
import bcrypt from 'bcrypt'

const hashPassword = (password: string) => {
  const salt = parseInt(config.salt as string, 10)
  return bcrypt.hashSync(`${password}${config.pepper}`, salt)
}

class UserModel {
  // create new user
  async create(u: User): Promise<User> {
    try {
      // open connection
      const connection = await db.connect()
      const sql = `INSERT INTO users (email, user_name, first_name, last_name, password)
      values ($1, $2, $3, $4, $5) returning id, email, user_name, first_name, last_name`
      // run query
      const result = await connection.query(sql, [
        u.email,
        u.user_name,
        u.first_name,
        u.last_name,
        hashPassword(u.password)
      ])
      // release connection
      connection.release()
      // return created user
      return result.rows[0]
    } catch (error) {
      throw new Error(`unable to create user (${u.user_name}: ${(error as Error).message})`)
    }
  }
  // get all users
  async index(): Promise<User[]> {
    try {
      const connection = await db.connect()
      const sql = 'SELECT id, email, user_name, first_name, last_name from users'
      const result = await connection.query(sql)
      connection.release()
      return result.rows
    } catch (error) {
      throw new Error(`Error at retrieving users ${(error as Error).message}`)
    }
  }
  // get single user
  async show(id: string): Promise<User> {
    try {
      const connection = await db.connect()
      const sql = 'SELECT id, email, user_name, first_name, last_name from users WHERE id=($1)'
      const result = await connection.query(sql, [id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Couldn't find user ${id}, ${(error as Error).message}`)
    }
  }
  // update user
  async update(u: User): Promise<User> {
    try {
      const connection = await db.connect()
      const sql = `UPDATE users SET email=$1, user_name=$2, first_name=$3, last_name=$4, password=$5 WHERE id=$6 RETURNING id, email, user_name, first_name, last_name`
      const result = await connection.query(sql, [
        u.email,
        u.user_name,
        u.first_name,
        u.last_name,
        hashPassword(u.password),
        u.id
      ])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Couldn't update user ${u.user_name}, ${(error as Error).message}`)
    }
  }
  // delete user
  async destroy(id: string): Promise<User> {
    try {
      const connection = await db.connect()
      const sql = `DELETE from users WHERE id=($1) RETURNING id, email, user_name, first_name, last_name`
      const result = await connection.query(sql, [id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Couldn't delete user ${id}, ${(error as Error).message}`)
    }
  }
  // auth user
  async authenticate(email: string, password: string): Promise<User | null> {
    try {
      const connection = await db.connect()
      const sql = 'SELECT password from users WHERE email=$1'
      const result = await connection.query(sql, [email])
      connection.release()
      if (result.rows.length) {
        const { password: hashPassword } = result.rows[0]
        const isPasswordValid = bcrypt.compareSync(`${password}${config.pepper}`, hashPassword)
        if (isPasswordValid) {
          const connection = await db.connect()
          const userInfo = await connection.query(
            'SELECT id, email, user_name, first_name, last_name FROM users WHERE email=($1)',
            [email]
          )
          connection.release()
          return userInfo.rows[0]
        }
      }

      return null
    } catch (error) {
      throw new Error(`Unable to login: ${(error as Error).message}`)
    }
  }
}
export default UserModel
