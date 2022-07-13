import db from '../database'
import User from '../types/user.type'

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
        u.password
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
  async getUsers(): Promise<User[]> {
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
  async getUser(id: string): Promise<User> {
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
  async updateUser(u: User): Promise<User> {
    try {
      const connection = await db.connect()
      const sql = `UPDATE users SET email=$1, user_name=$2, first_name=$3, last_name=$4, password=$5 WHERE id=$6 RETURNING id, email, user_name, first_name, last_name`
      const result = await connection.query(sql, [
        u.email,
        u.user_name,
        u.first_name,
        u.last_name,
        u.password,
        u.id
      ])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Couldn't update user ${u.user_name}, ${(error as Error).message}`)
    }
  }
  // delete user
  async deleteUser(id: string): Promise<User> {
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
}
export default UserModel
