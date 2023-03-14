import { Router } from 'express'
import authRoute from './auth.route'
import bookingRoute from './crud/booking.route'

const router = Router()

router.use('/auth', authRoute)
router.use('/booking', bookingRoute)

export default router
