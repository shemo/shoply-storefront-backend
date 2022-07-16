import ProductModel from '../product.model'
import db from '../../database'
import Product from '../../types/product.type'

const productModel = new ProductModel()

describe('Product Model', () => {
  describe('Test method exists', () => {
    it('should have get all  products', () => {
      expect(productModel.getProducts).toBeDefined()
    })
    it('should have get single  product', () => {
      expect(productModel.getProduct).toBeDefined()
    })
    it('should have create new product', () => {
      expect(productModel.create).toBeDefined()
    })
    it('should have update product', () => {
      expect(productModel.updateProduct).toBeDefined()
    })
    it('should have delete product', () => {
      expect(productModel.deleteProduct).toBeDefined()
    })
  })

  describe('Test Product Model Logic', () => {
    const product = {
      name: 'test product',
      description: 'Test product description',
      price: 20,
      category: 'test category name'
    } as Product

    beforeAll(async () => {
      const createdProduct = await productModel.create(product)
      product.id = createdProduct.id
    })

    afterAll(async () => {
      const connection = await db.connect()
      const sql = 'DELETE FROM products;'
      await connection.query(sql)
      connection.release()
    })
    it('create method should return a new product', async () => {
      const createdProduct = await productModel.create({
        name: 'test product 2',
        description: 'Test product 2 description',
        price: 20,
        category: 'test category name'
      } as Product)

      expect(createdProduct).toEqual({
        id: createdProduct.id,
        name: 'test product 2',
        description: 'Test product 2 description',
        price: 20,
        category: 'test category name'
      } as Product)
    })
    it('Get all products should return all available products', async () => {
      const products = await productModel.getProducts()
      expect(products.length).toBe(2)
    })
    it('Get single product should return product details', async () => {
      const singleProduct = await productModel.getProduct(product.id as string)
      expect(singleProduct.id).toBe(product.id)
      expect(singleProduct.name).toBe(product.name)
      expect(singleProduct.description).toBe(product.description)
      expect(singleProduct.price).toBe(product.price)
      expect(singleProduct.category).toBe(product.category)
    })

    it('Update single product should return product updated details', async () => {
      const updatedProduct = await productModel.updateProduct({
        ...product,
        name: 'test Product Update',
        description: 'test Product Description Update',
        price: 60
      })
      expect(updatedProduct.id).toBe(product.id)
      expect(updatedProduct.name).toBe('test Product Update')
      expect(updatedProduct.description).toBe('test Product Description Update')
      expect(updatedProduct.price).toBe(60)
      expect(updatedProduct.category).toBe(product.category)
    })
    it('Delete product should delete product from database', async () => {
      const deletedProduct = await productModel.deleteProduct(product.id as string)
      expect(deletedProduct.id).toBe(product.id)
    })
  })
})
