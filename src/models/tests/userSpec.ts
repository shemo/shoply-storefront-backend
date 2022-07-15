import UserModel from '../user.model'
import db from '../../database'
import User from '../../types/user.type'

const userModel = new UserModel()

describe('User Model', () => {
  describe('Test method exists', () => {
    it('should have get all  users', () => {
      expect(userModel.getUsers).toBeDefined()
    })
    it('should have get single  user', () => {
      expect(userModel.getUser).toBeDefined()
    })
    it('should have create new user', () => {
      expect(userModel.create).toBeDefined()
    })
    it('should have update user', () => {
      expect(userModel.updateUser).toBeDefined()
    })
    it('should have delete user', () => {
      expect(userModel.deleteUser).toBeDefined()
    })
  })

  describe('Test User Model Logic', () => {
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
    it('create method should return a new user', async () => {
      const createdUser = await userModel.create({
        email: 'test2@test.com',
        user_name: 'test2User',
        first_name: 'Test',
        last_name: 'User',
        password: 'test123456'
      } as User)

      expect(createdUser).toEqual({
        id: createdUser.id,
        email: 'test2@test.com',
        user_name: 'test2User',
        first_name: 'Test',
        last_name: 'User'
      } as User)
    })
    it('Get all users should return all available users', async () => {
      const users = await userModel.getUsers()
      expect(users.length).toBe(2)
    })
    it('Get single user should return user details', async () => {
      const returnedUser = await userModel.getUser(user.id as string)
      expect(returnedUser.id).toBe(user.id)
      expect(returnedUser.email).toBe(user.email)
      expect(returnedUser.user_name).toBe(user.user_name)
      expect(returnedUser.first_name).toBe(user.first_name)
      expect(returnedUser.last_name).toBe(user.last_name)
    })

    it('Update single user should return user updated details', async () => {
      const updatedUser = await userModel.updateUser({
        ...user,
        user_name: 'testUserUpdate',
        first_name: 'shimaa',
        last_name: 'adel'
      })
      expect(updatedUser.id).toBe(user.id)
      expect(updatedUser.email).toBe(user.email)
      expect(updatedUser.user_name).toBe('testUserUpdate')
      expect(updatedUser.first_name).toBe('shimaa')
      expect(updatedUser.last_name).toBe('adel')
    })
    it('Delete user should delete user from database', async () => {
      const deletedUser = await userModel.deleteUser(user.id as string)
      expect(deletedUser.id).toBe(user.id)
    })
  })
})
