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

export const index = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userModel.index()
    res.json({
      status: 'success',
      data: users,
      message: 'Users retrieved Successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userModel.show(req.params.id as unknown as string)
    res.json({
      status: 'success',
      data: user,
      message: 'User retrieved Successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userModel.update(req.body)
    res.json({
      status: 'success',
      data: user,
      message: 'User updated Successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userModel.destroy(req.params.id as unknown as string)
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
