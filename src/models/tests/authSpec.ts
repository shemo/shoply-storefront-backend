import UserModel from '../user.model'
import db from '../../database'
import User from '../../types/user.type'

const userModel = new UserModel()

describe('Authentication Model', () => {
  describe('Test method exists', () => {
    it('should have Authenticate User method', () => {
      expect(userModel.authenticate).toBeDefined()
    })
  })
  describe('Test Authentication Logic', () => {
    const user = {
      email: 'test@test.com',
      user_name: 'testUser',
      first_name: 'Test',
      last_name: 'User',
      password: 'test123456'
    } as User

    beforeAll(async () => {
      const createUser = await userModel.create(user)
      user.id = createUser.id
    })

    afterAll(async () => {
      const connection = await db.connect()
      const sql = 'DELETE FROM users;'
      await connection.query(sql)
      connection.release()
    })

    it('Authentication method should return authenticated user', async () => {
      const authenticatedUser = await userModel.authenticate(user.email, user.password as string)
      expect(authenticatedUser?.email).toBe(user.email)
      expect(authenticatedUser?.user_name).toBe(user.user_name)
      expect(authenticatedUser?.first_name).toBe(user.first_name)
      expect(authenticatedUser?.last_name).toBe(user.last_name)
    })

    it('Authentication method should return null for wrong credentials', async () => {
      const authenticatedUser = await userModel.authenticate(
        'shimaa@shimaaadel.com',
        'wrong-password'
      )
      expect(authenticatedUser).toBe(null)
    })
  })
})
