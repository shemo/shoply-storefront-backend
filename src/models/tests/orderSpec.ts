import OrderModel from '../order.model'
import UserModel from '../user.model'
import db from '../../database'
import Order from '../../types/order.type'
import User from '../../types/user.type'
const orderModel = new OrderModel()
const userModel = new UserModel()
let token: string

describe('Product Model', () => {
  describe('Test method exists', () => {
    it('should have get all  orders', () => {
      expect(orderModel.index).toBeDefined()
    })
    it('should have get single  order', () => {
      expect(orderModel.show).toBeDefined()
    })
    it('should have create new order', () => {
      expect(orderModel.create).toBeDefined()
    })
    it('should have update order', () => {
      expect(orderModel.update).toBeDefined()
    })
    it('should have delete order', () => {
      expect(orderModel.destroy).toBeDefined()
    })
  })

  describe('Test Order Model Logic', () => {
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
      const sql1 = 'DELETE FROM Orders;'
      const sql2 = 'DELETE FROM users;'
      await connection.query(sql1)
      await connection.query(sql2)
      connection.release()
    })

    it('create method should return a new order', async () => {
      const createdOrder = await orderModel.create({
        user_id: user.id,
        quantity: 2,
        status: 'delivered'
      } as Order)

      expect(createdOrder).toEqual({
        id: createdOrder.id,
        user_id: user.id,
        quantity: 2,
        status: 'delivered'
      } as Order)
    })
    it('Get all orders should return all available orders', async () => {
      const orders = await orderModel.index()
      expect(orders.length).toBe(2)
    })
    it('Get single order should return order details', async () => {
      const singleOrder = await orderModel.show(order.id as string)
      expect(singleOrder.id).toBe(order.id)
      expect(singleOrder.user_id).toBe(order.user_id)
    })

    it('Update single order should return order updated details', async () => {
      const updatedOrder = await orderModel.update({
        ...order,
        quantity: 5,
        status: 'active'
      })
      expect(updatedOrder.id).toBe(order.id)
      expect(updatedOrder.quantity).toBe(5)
      expect(updatedOrder.status).toBe('active')
    })
    it('Delete order should delete order from database', async () => {
      const deletedOrder = await orderModel.destroy(order.id as string)
      expect(deletedOrder.id).toBe(order.id)
    })
  })
})
