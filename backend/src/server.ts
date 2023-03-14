import config from '@config'
import Logger from '@utils/logger.util'
import App from './app'

const port = config.port

const server = new App().server

server.listen(port, () => {
  Logger.info(`App is running at http://localhost:${port}`)
})
