import express from 'express'
import cors from 'cors'
import compression from 'compression'
import helmet from 'helmet'
import nocache from 'nocache'
import cookieParser from 'cookie-parser'
import yamljs from 'yamljs'
import swaggerUi from 'swagger-ui-express'
import path from 'path'
import morgan from 'morgan'
import router from '@routes'
import 'resources/redis'
import errorMiddleware from '@middlewares/error.middleware'

class App {
  public server

  constructor() {
    this.server = express()

    this.initializeSecurity()
    this.initializeMiddleware()
    this.initializeRoute()
    this.initializeErrorMiddleware()
    this.initializeSwagger()
  }

  initializeMiddleware() {
    this.server.use(cors({ credentials: true, origin: ['http://localhost:3000'] }))
    this.server.use(cookieParser())
    this.server.use(compression())
    this.server.use(express.json({ limit: '100mb' }))
    this.server.use(express.urlencoded({ limit: '100mb', extended: true }))
    if (process.env.NODE_ENV === 'development') {
      this.server.use(morgan('dev'))
    }
  }

  initializeErrorMiddleware() {
    this.server.use(errorMiddleware)
  }

  initializeSecurity() {
    this.server.use(nocache())
    this.server.use(helmet())
  }

  initializeSwagger() {
    if (process.env.NODE_ENV === 'prod') return

    const swaggerDoc = yamljs.load(path.join(__dirname, './openapi3.yaml'))
    this.server.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(swaggerDoc))
    this.server.use('/api-docs', (req, res) => {
      res.send(swaggerDoc)
    })
  }

  initializeRoute() {
    this.server.use('/api/v1', router)
    // this.server.use('/api/v1/booking', bookingRouter)
    // this.server.use('/api/v1/card-type', cardTypeRouter)

    this.server.use('/healthcheck', (_, res) => {
      res.status(200).send('Ok')
    })
  }
}

export default App
