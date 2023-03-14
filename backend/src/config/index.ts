import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'

const pathEnv = path.join(__dirname, `../../.env.${process.env.NODE_ENV || 'dev'}`)

if (fs.existsSync(pathEnv)) {
  dotenv.config({
    path: pathEnv,
  })
} else {
  throw Error(`File: ${pathEnv} not found`)
}

export default {
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  mongodb: {
    port: process.env.MONGODB_PORT,
    host: process.env.MONGODB_HOST,
    username: process.env.MONGODB_USERNAME,
    password: process.env.MONGODB_PASSWORD,
    database: process.env.MONGODB_DATABASE,
  },
  postgresql: {
    port: process.env.POSTGRES_PORT,
    host: process.env.POSTGRES_HOST,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    schema: process.env.POSTGRES_SCHEMA,
  },
  redis: {
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    database: process.env.REDIS_DATABASE,
    cacheExpire: process.env.REDIS_CACHE_EXPIRE,
  },
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    accessExpire: process.env.JWT_ACCESS_EXPIRE,
    refreshExpire: process.env.JWT_REFRESH_EXPIRE,
  },
}
