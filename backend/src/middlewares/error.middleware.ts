import config from '@config'
import { HttpException } from '@exceptions'
import Logger from '@utils/logger.util'
import { NextFunction, Request, Response } from 'express'

const errorMiddleware = (err: HttpException, req: Request, res: Response, next: NextFunction) => {
  const status: number = err?.statusCode?.status || 500
  const message: string = err.message || 'Something went wrong'

  if (config.env === 'dev') Logger.error(err)

  Logger.error(`Status: ${status} - Msg: ${message}`)
  res.status(status).json({ message })
}

export default errorMiddleware
