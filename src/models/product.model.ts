import db from '../database'
import Product from '../types/product.type'

class ProductModel {
  // create new Product
  async create(p: Product): Promise<Product> {
    try {
      // open connection
      const connection = await db.connect()
      const sql = `INSERT INTO products (name, description, price, category)
      values ($1, $2, $3, $4) returning id, name, description, price, category`
      // run query
      const result = await connection.query(sql, [p.name, p.description, p.price, p.category])
      // release connection
      connection.release()
      // return created Product
      return result.rows[0]
    } catch (error) {
      throw new Error(`unable to create Product (${p.name}: ${(error as Error).message})`)
    }
  }
  // get all Products
  async getProducts(): Promise<Product[]> {
    try {
      const connection = await db.connect()
      const sql = 'SELECT id, name, description, price, category from products'
      const result = await connection.query(sql)
      connection.release()
      return result.rows
    } catch (error) {
      throw new Error(`Error at retrieving Products ${(error as Error).message}`)
    }
  }
  // get single Product
  async getProduct(id: string): Promise<Product> {
    try {
      const connection = await db.connect()
      const sql = 'SELECT id, name, description, price, category from products WHERE id=($1)'
      const result = await connection.query(sql, [id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Couldn't find Product ${id}, ${(error as Error).message}`)
    }
  }
  // update Product
  async updateProduct(p: Product): Promise<Product> {
    try {
      const connection = await db.connect()
      const sql = `UPDATE products SET name = ($1) ,description= ($2) , price= ($3) , category = ($4) WHERE id = ($5) RETURNING *`
      const result = await connection.query(sql, [p.name, p.description, p.price, p.category, p.id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Couldn't update Product ${p.name}, ${(error as Error).message}`)
    }
  }
  // delete Product
  async deleteProduct(id: string): Promise<Product> {
    try {
      const connection = await db.connect()
      const sql = `DELETE from products WHERE id=($1) RETURNING id, name, description, price, category`
      const result = await connection.query(sql, [id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Couldn't delete Product ${id}, ${(error as Error).message}`)
    }
  }
}
export default ProductModel
