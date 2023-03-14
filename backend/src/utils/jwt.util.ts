import config from '@config'
import { TokenPayload } from '@interfaces'
import jwt, { SignOptions } from 'jsonwebtoken'

const signToken = (payload: TokenPayload, privateKey: string, options: SignOptions): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, privateKey, options, (err, token) => {
      if (err) reject(err)
      else resolve(token)
    })
  })
}

const generateAccessToken = async (userId: string, role: string): Promise<string> => {
  const payload: TokenPayload = {
    sub: userId,
    role,
  }
  const accessToken = await signToken(payload, config.jwt.accessSecret, { expiresIn: config.jwt.accessExpire })
  return accessToken
}

const generateRefreshToken = async (userId: string, role: string): Promise<string> => {
  const payload: TokenPayload = {
    sub: userId,
    role,
  }
  const refreshToken = await signToken(payload, config.jwt.refreshSecret, { expiresIn: config.jwt.refreshExpire })
  return refreshToken
}

const verifyToken = async (token: string, type: 'accessToken' | 'refreshToken'): Promise<TokenPayload> => {
  return new Promise((resolve, reject) => {
    let secret: string
    if (type === 'accessToken') secret = config.jwt.accessSecret
    else secret = config.jwt.refreshSecret

    jwt.verify(token, secret, async (err, payload) => {
      if (err) reject(err)
      return resolve(payload as TokenPayload)
    })
  })
}

export { generateAccessToken, generateRefreshToken, verifyToken }
