import { Router } from 'express'
import * as authController from '@controllers/auth.controller'
import authMiddleware from '@middlewares/auth.middleware'

const router = Router()

router.post('/signup', authController.signup)
router.post('/signin', authController.signin)
router.post('/refresh', authController.refresh)
router.post('/logout', authMiddleware, authController.logout)

export default router
