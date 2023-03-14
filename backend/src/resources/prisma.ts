import { PrismaClient } from '@prisma/client'

// import logger from '@utils/logger.util'
// const prisma = new PrismaClient({
//   log: [
//     {
//       emit: 'event',
//       level: 'query',
//     },
//     {
//       emit: 'stdout',
//       level: 'error',
//     },
//     {
//       emit: 'stdout',
//       level: 'info',
//     },
//     {
//       emit: 'stdout',
//       level: 'warn',
//     },
//   ],
// })
// prisma.$on('query', (e) => {
//   logger.info('Query: ' + e.query + '\n\tParams: ' + e.params + '\n\tDuration: ' + e.duration + 'ms')
// })

const prisma = new PrismaClient()

export default prisma
