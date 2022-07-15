import supertest from 'supertest'
import db from '../../database'
import UserModel from '../../models/user.model'
import User from '../../types/user.type'
import app from '../../index'

const userModel = new UserModel()
// create a request object
const request = supertest(app)
let token: string

describe('User API endpoints', () => {
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
  })

  afterAll(async () => {
    const connection = await db.connect()
    const sql = 'DELETE FROM users;'
    await connection.query(sql)
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
    it('should create new user', async () => {
      const response = await request
        .post('/api/users')
        .set('Content-type', 'application/json')
        .send({
          email: 'test2@test.com',
          user_name: 'test2User',
          first_name: 'Test2',
          last_name: 'User',
          password: 'test123456'
        } as User)

      expect(response.status).toBe(200)
      const { email, user_name, first_name, last_name } = response.body.data
      expect(email).toBe('test2@test.com')
      expect(user_name).toBe('test2User')
      expect(first_name).toBe('Test2')
      expect(last_name).toBe('User')
    })
    it('should retrieve all users', async () => {
      const response = await request
        .get('/api/users')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).toBe(200)
      expect(response.body.data.length).toBe(2)
    })
    it('should get single user info', async () => {
      const response = await request
        .get(`/api/users/${user.id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).toBe(200)
      expect(response.body.data.user_name).toBe('testUser')
      expect(response.body.data.email).toBe('test@test.com')
    })
    it('should update user', async () => {
      const response = await request
        .patch(`/api/users/${user.id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          ...user,
          user_name: 'shimaaadel',
          first_name: 'shimaa',
          last_name: 'adel'
        })
      expect(response.status).toBe(200)
      const { id, email, user_name, first_name, last_name } = response.body.data
      expect(id).toBe(user.id)
      expect(email).toBe(user.email)
      expect(user_name).toBe('shimaaadel')
      expect(first_name).toBe('shimaa')
      expect(last_name).toBe('adel')
    })
    it('should delete user', async () => {
      const response = await request
        .delete(`/api/users/${user.id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).toBe(200)
      expect(response.body.data.id).toBe(user.id)
      expect(response.body.data.user_name).toBe('shimaaadel')
    })
  })
})
