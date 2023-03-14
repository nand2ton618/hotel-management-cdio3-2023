import config from '@config'
import IORedis from 'ioredis'
import Logger from '@utils/logger.util'

const redis = new IORedis({
  port: Number(config.redis.port),
  host: config.redis.host,
})

redis.on('connect', () => {
  Logger.info('Connected to redis')
})

redis.on('error', (err) => {
  Logger.error(err)
})

redis.on('end', () => {
  Logger.info('Disconnected from redis')
})

export default redis
