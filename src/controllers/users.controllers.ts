import { NextFunction, Request, Response } from 'express'
import config from '../config'
import jwt from 'jsonwebtoken'
import UserModel from '../models/user.model'

const userModel = new UserModel()
export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userModel.create(req.body)
    res.json({
      status: 'success',
      data: { ...user },
      message: 'User Created Successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userModel.getUsers()
    res.json({
      status: 'success',
      data: users,
      message: 'Users retrieved Successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userModel.getUser(req.params.id as unknown as string)
    res.json({
      status: 'success',
      data: user,
      message: 'User retrieved Successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userModel.updateUser(req.body)
    res.json({
      status: 'success',
      data: user,
      message: 'User updated Successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userModel.deleteUser(req.params.id as unknown as string)
    res.json({
      status: 'success',
      data: user,
      message: 'User deleted Successfully'
    })
  } catch (error) {
    next(error)
  }
}

// auth
export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body
    const user = await userModel.authenticate(email, password)
    const token = jwt.sign({ user }, config.tokenSecret as unknown as string)
    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: `The email and password doesn't match`
      })
    }
    return res.json({
      status: 'success',
      data: { ...user, token },
      message: 'User authenticated Successfully'
    })
  } catch (error) {
    next(error)
  }
}
