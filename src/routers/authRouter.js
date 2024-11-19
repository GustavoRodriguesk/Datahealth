import express from 'express'
import signupController from '../controllers/auth/signupController.js'
import loginController from '../controllers/auth/loginController.js'
import logoutController from '../controllers/auth/logoutController.js'
import refreshTokenController from '../controllers/auth/refreshTokenController.js'
import  listUsersController  from '../controllers/auth/listController.js'

const router = express.Router()

router.post('/signup', signupController)
router.post('/login', loginController)
router.post('/logout', logoutController)
router.post('/refresh-token', refreshTokenController)
router.get('/users', listUsersController)
export default router