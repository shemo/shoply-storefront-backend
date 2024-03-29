import { Router } from 'express'
import * as controllers from '../../controllers/users.controllers'
import authenticationMiddleware from '../../middleware/authentication.middleware'

const routes = Router()

routes.route('/').get(authenticationMiddleware, controllers.index).post(controllers.create)
routes
  .route('/:id')
  .get(authenticationMiddleware, controllers.show)
  .patch(authenticationMiddleware, controllers.update)
  .delete(authenticationMiddleware, controllers.destroy)

// auth
routes.route('/auth').post(controllers.authenticate)
export default routes
