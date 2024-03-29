import { NextFunction, Request, Response } from 'express'
import ProductModel from '../models/product.model'

const productModel = new ProductModel()
export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await productModel.create(req.body)
    res.json({
      status: 'success',
      data: { ...product },
      message: 'Product Created Successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const index = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await productModel.index()
    res.json({
      status: 'success',
      data: products,
      message: 'Products retrieved Successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await productModel.show(req.params.id as unknown as string)
    res.json({
      status: 'success',
      data: product,
      message: 'Product retrieved Successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await productModel.update(req.body)
    res.json({
      status: 'success',
      data: product,
      message: 'Product updated Successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await productModel.destroy(req.params.id as unknown as string)
    res.json({
      status: 'success',
      data: product,
      message: 'Product deleted Successfully'
    })
  } catch (error) {
    next(error)
  }
}
