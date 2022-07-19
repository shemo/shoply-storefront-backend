import supertest from 'supertest'
import db from '../../database'
import OrderModel from '../../models/order.model'
import Order from '../../types/order.type'
import UserModel from '../../models/user.model'
import User from '../../types/user.type'
import app from '../../index'

const orderModel = new OrderModel()
const userModel = new UserModel()
// create a request object
const request = supertest(app)
let token: string

describe('Order API endpoints', () => {
  const order = {
    quantity: 2,
    status: 'pending'
  } as Order

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
    order.user_id = user.id as string
    const createdOrder = await orderModel.create(order)
    order.id = createdOrder.id
  })

  afterAll(async () => {
    const connection = await db.connect()
    const sql1 = 'DELETE FROM orders;'
    const sql2 = 'DELETE FROM users;'
    await connection.query(sql1)
    await connection.query(sql2)
    connection.release()
  })
  describe('Test Auth On Orders route', () => {
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
    it('should create new order', async () => {
      const response = await request
        .post('/api/orders')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          user_id: user.id,
          quantity: 4,
          status: 'delivered'
        } as Order)

      expect(response.status).toBe(200)
      const { user_id, quantity, status } = response.body.data
      expect(user_id).toBe(user.id)
      expect(quantity).toBe(4)
      expect(status).toBe('delivered')
    })
    it('should retrieve all Orders', async () => {
      const response = await request
        .get('/api/orders')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).toBe(200)
      expect(response.body.data.length).toBe(2)
    })
    it('should get single Order info', async () => {
      const response = await request
        .get(`/api/orders/${order.id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).toBe(200)
      expect(response.body.data.quantity).toBe(2)
      expect(response.body.data.status).toBe('pending')
    })
    it('should update Order', async () => {
      const response = await request
        .patch(`/api/orders/${order.id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          ...order,
          quantity: 3,
          status: 'delivered'
        } as Order)
      expect(response.status).toBe(200)
      const { id, user_id, quantity, status } = response.body.data
      expect(id).toBe(order.id)
      expect(user_id).toBe(order.user_id)
      expect(quantity).toBe(3)
      expect(status).toBe('delivered')
    })
    it('should delete Order', async () => {
      const response = await request
        .delete(`/api/orders/${order.id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).toBe(200)
      expect(response.body.data.id).toBe(order.id)
    })
  })
})
