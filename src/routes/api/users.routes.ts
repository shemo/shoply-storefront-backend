import { Router } from 'express'
import * as controllers from '../../controllers/users.controllers'
import authenticationMiddleware from '../../middleware/authentication.middleware'

const routes = Router()

routes.route('/').get(authenticationMiddleware, controllers.getUsers).post(controllers.create)
routes
  .route('/:id')
  .get(authenticationMiddleware, controllers.getUser)
  .patch(authenticationMiddleware, controllers.updateUser)
  .delete(authenticationMiddleware, controllers.deleteUser)

// auth
routes.route('/auth').post(controllers.authenticate)
export default routes
