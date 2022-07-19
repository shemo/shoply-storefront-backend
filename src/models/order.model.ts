import db from '../database'
import Order from '../types/order.type'

class OrderModel {
  // create new Order
  async create(o: Order): Promise<Order> {
    try {
      // open connection
      const connection = await db.connect()
      const sql = `INSERT INTO orders (user_id, status, quantity)
      values ($1, $2, $3) returning id, user_id, status, quantity`
      // run query
      const result = await connection.query(sql, [o.user_id, o.status, o.quantity])
      // release connection
      connection.release()
      // return created Order
      return result.rows[0]
    } catch (error) {
      throw new Error(`unable to create Order (${o.id}: ${(error as Error).message})`)
    }
  }
  // get all Orders
  async index(): Promise<Order[]> {
    try {
      const connection = await db.connect()
      const sql = 'SELECT id, user_id, status, quantity from orders'
      const result = await connection.query(sql)
      connection.release()
      return result.rows
    } catch (error) {
      throw new Error(`Error at retrieving Orders ${(error as Error).message}`)
    }
  }
  //get single Order
  async show(id: string): Promise<Order> {
    try {
      const connection = await db.connect()
      const sql = 'SELECT id, user_id, status, quantity from orders WHERE id=($1)'
      const result = await connection.query(sql, [id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Couldn't find Order ${id}, ${(error as Error).message}`)
    }
  }
  // update Order
  async update(o: Order): Promise<Order> {
    try {
      const connection = await db.connect()
      const sql = `UPDATE orders SET user_id = ($1) ,status= ($2) , quantity= ($3) WHERE id = ($4) RETURNING *`
      const result = await connection.query(sql, [o.user_id, o.status, o.quantity, o.id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Couldn't update Order ${o.id}, ${(error as Error).message}`)
    }
  }
  // delete Order
  async destroy(id: string): Promise<Order> {
    try {
      const connection = await db.connect()
      const sql = `DELETE from orders WHERE id=($1) RETURNING id, user_id, status, quantity`
      const result = await connection.query(sql, [id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Couldn't delete Order ${id}, ${(error as Error).message}`)
    }
  }
}
export default OrderModel
