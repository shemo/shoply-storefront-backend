import { NextFunction, Request, Response } from 'express'

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
