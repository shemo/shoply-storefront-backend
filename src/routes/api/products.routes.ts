import { Router } from 'express'
import * as controllers from '../../controllers/products.controllers'
import authenticationMiddleware from '../../middleware/authentication.middleware'

const routes = Router()

routes.route('/').get(authenticationMiddleware, controllers.index).post(controllers.create)
routes
  .route('/:id')
  .get(authenticationMiddleware, controllers.show)
  .patch(authenticationMiddleware, controllers.update)
  .delete(authenticationMiddleware, controllers.destroy)

export default routes
