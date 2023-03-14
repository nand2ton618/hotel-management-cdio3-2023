import winston from 'winston'
import expressWinston from 'express-winston'
import config from '@config'

const { createLogger, format, transports } = winston
const { combine, colorize, printf } = format

const formatProd = () => {
  const replaceError = ({ label, level, message, stack }: any) => ({ label, level, message, stack })
  const replacer = (key: string, value: any) => (value instanceof Error ? replaceError(value) : value)
  return combine(format.json({ replacer }))
}

const formatDev = () => {
  const formatMessage = (info: any) =>
    `${info.level} ${info.message}${info.meta ? ` ${JSON.stringify(info.meta)}` : ''}`
  const formatError = (info: any) => `${info.level} ${info.message}\n\n${info.stack}`
  const fmt = (info: any) => (info instanceof Error ? formatError(info) : formatMessage(info))
  return combine(colorize(), printf(fmt))
}

const Logger: winston.Logger = createLogger({
  exitOnError: false,
  format: config.env === 'prod' ? formatProd() : formatDev(),
  level: 'info',
  silent: config.env === 'test',
  transports: [new transports.Console()],
})

const requestLoggin = expressWinston.logger({
  transports: [new winston.transports.Console()],
  format: config.env === 'prod' ? formatProd() : formatDev(),
  meta: true,
  msg: 'HTTP {{req.method}} {{req.url}}',
  expressFormat: true,
  colorize: true,
  ignoreRoute: function (req, res) {
    return req.path?.includes('swagger-ui') || req.path?.includes('api-docs')
  },
})

const errorLoggin = expressWinston.errorLogger({
  transports: [new transports.Console()],
  format: config.env === 'prod' ? formatProd() : formatDev(),
})

export { requestLoggin, errorLoggin }
export default Logger
