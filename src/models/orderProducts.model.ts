import db from '../database'
import OrderProducts from '../types/orderProducts.type'

class OrderProductsModel {
  // create new Order Products
  async create(o: OrderProducts): Promise<OrderProducts> {
    try {
      // open connection
      const connection = await db.connect()
      const sql = `INSERT INTO order_products (order_id, product_id, price)
      values ($1, $2, $3) returning id, order_id, product_id, price`
      // run query
      const result = await connection.query(sql, [o.order_id, o.product_id, o.price])
      // release connection
      connection.release()
      // return created Order
      return result.rows[0]
    } catch (error) {
      throw new Error(`unable to create Order Products (${o.id}: ${(error as Error).message})`)
    }
  }
  // get all Orders Products
  async index(): Promise<OrderProducts[]> {
    try {
      const connection = await db.connect()
      const sql = 'SELECT id, order_id, product_id, price from order_products'
      const result = await connection.query(sql)
      connection.release()
      return result.rows
    } catch (error) {
      throw new Error(`Error at retrieving Order Products ${(error as Error).message}`)
    }
  }
  //get single Order Products
  async show(id: string): Promise<OrderProducts> {
    try {
      const connection = await db.connect()
      const sql = 'SELECT id, order_id, product_id, price from order_products WHERE id=($1)'
      const result = await connection.query(sql, [id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Couldn't find Order Products ${id}, ${(error as Error).message}`)
    }
  }
  // update Order products
  async update(o: OrderProducts): Promise<OrderProducts> {
    try {
      const connection = await db.connect()
      const sql = `UPDATE order_products SET order_id = ($1) ,product_id= ($2) , price= ($3) WHERE id = ($4) RETURNING *`
      const result = await connection.query(sql, [o.order_id, o.product_id, o.price, o.id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Couldn't update Order Products ${o.id}, ${(error as Error).message}`)
    }
  }
  // delete Order Products
  async destroy(id: string): Promise<OrderProducts> {
    try {
      const connection = await db.connect()
      const sql = `DELETE from order_products WHERE id=($1) RETURNING id, order_id, product_id, price`
      const result = await connection.query(sql, [id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Couldn't delete Order Products ${id}, ${(error as Error).message}`)
    }
  }
}
export default OrderProductsModel
