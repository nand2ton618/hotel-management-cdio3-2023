import { verifyToken } from '@utils/jwt.util'
import Logger from '@utils/logger.util'
import { NextFunction, Request, Response } from 'express'

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization

  if (!bearer || !bearer.startsWith('Bearer '))
    return res.status(401).json({ message: 'No token, authorization denied' })
  const token = bearer.split(' ')[1]

  try {
    const payload = await verifyToken(token, 'accessToken')
    if (!req.user) req.user = { id: '' }
    req.user.id = payload.sub
    next()
  } catch (err) {
    Logger.error(err)
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token was expired' })
    } else {
      return res.status(401).json({ message: 'Token is not valid' })
    }
  }
}

export default authMiddleware
