import { NextFunction, Request, Response } from 'express'
import OrderModel from '../models/order.model'

const orderModel = new OrderModel()
export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await orderModel.create(req.body)
    res.json({
      status: 'success',
      data: { ...order },
      message: 'Order Created Successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const index = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await orderModel.index()
    res.json({
      status: 'success',
      data: orders,
      message: 'Orders retrieved Successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await orderModel.show(req.params.id as unknown as string)
    res.json({
      status: 'success',
      data: order,
      message: 'Order retrieved Successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await orderModel.update(req.body)
    res.json({
      status: 'success',
      data: order,
      message: 'Order updated Successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await orderModel.destroy(req.params.id as unknown as string)
    res.json({
      status: 'success',
      data: order,
      message: 'Order deleted Successfully'
    })
  } catch (error) {
    next(error)
  }
}
