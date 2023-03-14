import { NextFunction, Request, Response } from 'express'
import { refreshSchema, signInSchema, signUpSchema } from '@utils/validate.util'
import { StatusCode, HttpException } from '@exceptions'
import { generateAccessToken, generateRefreshToken, verifyToken } from '@utils/jwt.util'
import prisma from '@resources/prisma'
import bcrypt from 'bcrypt'
import catchAsync from '@utils/catchAsync.util'
import redis from '@resources/redis'
import config from '@config'

const signup = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const parsed = signUpSchema.safeParse(req.body)
  if (parsed.success === false) {
    const { error } = parsed
    throw new HttpException(error.toString(), StatusCode.BadRequest)
  }
  const userInput = parsed.data

  const userDb = await prisma.user.findUnique({ where: { email: userInput.email } })
  if (userDb) throw new HttpException('Email is already exist', StatusCode.BadRequest)

  const hashedPassword = await bcrypt.hash(userInput.password, 10)
  const newUser = await prisma.user.create({ data: { email: userInput.email, password: hashedPassword } })

  const accessToken = await generateAccessToken(newUser.id.toString(), newUser.role)
  const refreshToken = await generateRefreshToken(newUser.id.toString(), newUser.role)
  await redis.setex(refreshToken, config.redis.cacheExpire, 1)

  res.status(201).json({
    accessToken,
    refreshToken,
  })
})

const signin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const parsed = signInSchema.safeParse(req.body)
  if (parsed.success === false) {
    throw new HttpException('Invalid email or password', StatusCode.BadRequest)
  }

  const userInput = parsed.data

  const userDb = await prisma.user.findUnique({ where: { email: userInput.email } })
  if (!userDb) throw new HttpException('Invalid email', StatusCode.BadRequest)

  const isValidPassword = await bcrypt.compare(userInput.password, userDb.password)
  if (!isValidPassword) throw new HttpException('Password is incorrect', StatusCode.BadRequest)

  const accessToken = await generateAccessToken(userDb.id.toString(), userDb.role)
  const refreshToken = await generateRefreshToken(userDb.id.toString(), userDb.role)
  await redis.setex(refreshToken, config.redis.cacheExpire, 1)

  res.status(200).json({
    accessToken,
    refreshToken,
  })
})

const refresh = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const parsed = refreshSchema.safeParse(req.body)
  if (parsed.success === false) throw new HttpException('Refresh token is not available', StatusCode.BadRequest)

  const payload = await verifyToken(parsed.data.refreshToken, 'refreshToken')
  if (!payload) throw new HttpException('Refresh token is invalid', StatusCode.BadRequest)

  const deleteRefreshToken = await redis.del(parsed.data.refreshToken)
  if (!deleteRefreshToken) throw new HttpException('Refresh token not found in redis', StatusCode.BadRequest)

  const accessToken = await generateAccessToken(payload.sub, payload.role)
  const refreshToken = await generateRefreshToken(payload.sub, payload.role)
  await redis.setex(refreshToken, config.redis.cacheExpire, 1)

  res.status(200).json({
    accessToken,
    refreshToken,
  })
})

const logout = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const parsed = refreshSchema.safeParse(req.body)
  if (parsed.success === false) throw new HttpException('Refresh token is not available', StatusCode.BadRequest)

  const deleteRefreshToken = await redis.del(parsed.data.refreshToken)
  if (!deleteRefreshToken) throw new HttpException('Refresh token not found in redis', StatusCode.BadRequest)

  res.status(200).json({ message: 'Logout successfully' })
})

export { signup, signin, refresh, logout }
