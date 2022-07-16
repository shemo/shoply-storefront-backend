import { Router } from 'express'
import * as controllers from '../../controllers/products.controllers'
import authenticationMiddleware from '../../middleware/authentication.middleware'

const routes = Router()

routes.route('/').get(authenticationMiddleware, controllers.getProducts).post(controllers.create)
routes
  .route('/:id')
  .get(controllers.getProduct)
  .patch(controllers.updateProduct)
  .delete(controllers.deleteProduct)

export default routes
