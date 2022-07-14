import { Router } from 'express'
import * as controllers from '../../controllers/users.controllers'
const routes = Router()

routes.route('/').get(controllers.getUsers).post(controllers.create)
routes
  .route('/:id')
  .get(controllers.getUser)
  .patch(controllers.updateUser)
  .delete(controllers.deleteUser)

// auth
routes.route('/auth').post(controllers.authenticate)
export default routes
