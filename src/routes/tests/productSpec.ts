import supertest from 'supertest'
import db from '../../database'
import ProductModel from '../../models/product.model'
import Product from '../../types/product.type'
import UserModel from '../../models/user.model'
import User from '../../types/user.type'
import app from '../../index'

const productModel = new ProductModel()
const userModel = new UserModel()
// create a request object
const request = supertest(app)
let token: string

describe('Product API endpoints', () => {
  const product = {
    name: 'test product',
    description: 'Test product description',
    price: 20,
    category: 'test category name'
  } as Product

  const user = {
    email: 'test@test.com',
    user_name: 'testUser',
    first_name: 'Test',
    last_name: 'User',
    password: 'test123456'
  } as User

  beforeAll(async () => {
    const createdUser = await userModel.create(user)
    user.id = createdUser.id
    const createdProduct = await productModel.create(product)
    product.id = createdProduct.id
  })

  afterAll(async () => {
    const connection = await db.connect()
    const sql1 = 'DELETE FROM products;'
    const sql2 = 'DELETE FROM users;'
    await connection.query(sql1)
    await connection.query(sql2)
    connection.release()
  })
  describe('Test Auth route', () => {
    it('should authenticate and return token', async () => {
      const response = await request
        .post('/api/users/auth')
        .set('Content-type', 'application/json')
        .send({ email: 'test@test.com', password: 'test123456' })
      expect(response.status).toBe(200)
      const { id, email, token: userToken } = response.body.data
      expect(id).toBe(user.id)
      expect(email).toBe(user.email)
      token = userToken
    })

    it('should fail with status 401 with wrong credentials', async () => {
      const response = await request
        .post('/api/users/auth')
        .set('Content-type', 'application/json')
        .send({ email: 'invalidEmail@test.com', password: 'wrong-password' })

      expect(response.status).toBe(401)
    })
  })
  describe('Test CRUD Operations', () => {
    it('should create new product', async () => {
      const response = await request
        .post('/api/products')
        .set('Content-type', 'application/json')
        .set('Authorization', `${token}`)
        .send({
          name: 'test product 2',
          description: 'Test product 2 description',
          price: 40,
          category: 'test 2 category name'
        } as Product)

      expect(response.status).toBe(200)
      const { name, description, price, category } = response.body.data
      expect(name).toBe('test product 2')
      expect(description).toBe('Test product 2 description')
      expect(price).toBe(40)
      expect(category).toBe('test 2 category name')
    })
    it('should retrieve all products', async () => {
      const response = await request
        .get('/api/products')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).toBe(200)
      expect(response.body.data.length).toBe(2)
    })
    it('should get single product info', async () => {
      const response = await request
        .get(`/api/products/${product.id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).toBe(200)
      expect(response.body.data.name).toBe('test product')
      expect(response.body.data.price).toBe(20)
    })
    it('should update product', async () => {
      const response = await request
        .patch(`/api/products/${product.id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          ...product,
          name: 'test product edit',
          price: 45,
          category: 'category edit'
        } as Product)
      expect(response.status).toBe(200)
      const { id, name, description, price, category } = response.body.data
      expect(id).toBe(product.id)
      expect(name).toBe('test product edit')
      expect(description).toBe(product.description)
      expect(price).toBe(45)
      expect(category).toBe('category edit')
    })
    it('should delete product', async () => {
      const response = await request
        .delete(`/api/products/${product.id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).toBe(200)
      expect(response.body.data.id).toBe(product.id)
      expect(response.body.data.name).toBe('test product edit')
    })
  })
})
