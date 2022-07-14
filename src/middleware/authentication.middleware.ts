import { NextFunction, Request, Response } from 'express'
import config from '../config'
import jwt from 'jsonwebtoken'
import Error from '../interfaces/error.interface'

const handleUnauthorizedError = (next: NextFunction) => {
  const error: Error = new Error('Login Error: Please try again')
  error.status = 401
  next(error)
}
const validateTokenMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  try {
    // get auth header
    const authHeader = req.get('Authorization')
    // check authentication header
    if (authHeader) {
      //get token value
      // check if type is bearer or not
      const bearer = authHeader.split(' ')[0].toLowerCase()
      const token = authHeader.split(' ')[1]
      if (token && bearer === 'bearer') {
        //decode based on token secret
        const decode = jwt.verify(token, config.tokenSecret as unknown as string)
        if (decode) {
          next()
        } else {
          // auth failed
          handleUnauthorizedError(next)
        }
      } else {
        // token not bearer
        handleUnauthorizedError(next)
      }
    } else {
      // no token provided
      handleUnauthorizedError(next)
    }
  } catch (error) {
    handleUnauthorizedError(next)
  }
}

export default validateTokenMiddleware
