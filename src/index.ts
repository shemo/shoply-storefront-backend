import express, { Application, Request, Response } from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import RateLimit from 'express-rate-limit'
import errorMiddleware from './middleware/error.middleware'
import config from './config'
import db from './database'
import routes from './routes'
console.log(config)
// import * as dotenv from 'dotenv'

// dotenv.config()

const PORT = config.port || 3000
// create an instance server
const app: Application = express()
//middleware to parse incoming requests
app.use(express.json())
// HTTP request logger middleware
app.use(morgan('short'))
// securing middleware
app.use(helmet())

//apply rate limit
app.use(
  RateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers'
    message: 'Too many requests, please try again in 15 mins '
  })
)
// test db
db.connect().then((client) => {
  return client
    .query('SELECT NOW()')
    .then((res) => {
      client.release()
      console.log(res.rows)
    })
    .catch((err) => {
      client.release()
      console.log(err.stack)
    })
})
app.use(errorMiddleware)

app.use('/api', routes)
// add routing for / path
app.get('/', (req: Request, res: Response) => {
  // res.json({
  //   message: 'Welcome To SHOPLY, Your Storefront API'
  // })
  res.send('Welcome To SHOPLY, Your Storefront API')
})

// start express server
app.listen(PORT, () => {
  console.log(`Server is starting at port:${PORT}`)
})

export default app
