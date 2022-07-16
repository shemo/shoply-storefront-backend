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

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await productModel.getProducts()
    res.json({
      status: 'success',
      data: products,
      message: 'Products retrieved Successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await productModel.getProduct(req.params.id as unknown as string)
    res.json({
      status: 'success',
      data: product,
      message: 'Product retrieved Successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await productModel.updateProduct(req.body)
    res.json({
      status: 'success',
      data: product,
      message: 'Product updated Successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await productModel.deleteProduct(req.params.id as unknown as string)
    res.json({
      status: 'success',
      data: product,
      message: 'Product deleted Successfully'
    })
  } catch (error) {
    next(error)
  }
}
