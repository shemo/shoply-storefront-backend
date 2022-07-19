import { NextFunction, Request, Response } from 'express'
import OrderProductsModel from '../models/orderProducts.model'

const orderProductsModel = new OrderProductsModel()
export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orderProducts = await orderProductsModel.create(req.body)
    res.json({
      status: 'success',
      data: { ...orderProducts },
      message: 'Order Products Created Successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const index = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ordersProducts = await orderProductsModel.index()
    res.json({
      status: 'success',
      data: ordersProducts,
      message: 'Orders Products retrieved Successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orderProducts = await orderProductsModel.show(req.params.id as unknown as string)
    res.json({
      status: 'success',
      data: orderProducts,
      message: 'Order Products retrieved Successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orderProducts = await orderProductsModel.update(req.body)
    res.json({
      status: 'success',
      data: orderProducts,
      message: 'Order Products updated Successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orderProducts = await orderProductsModel.destroy(req.params.id as unknown as string)
    res.json({
      status: 'success',
      data: orderProducts,
      message: 'Order Products deleted Successfully'
    })
  } catch (error) {
    next(error)
  }
}
