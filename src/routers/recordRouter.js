import express from 'express'
import createController from '../controllers/record/createController.js'
import getByIdController from '../controllers/record/getByIdController.js'
import listController from '../controllers/record/listController.js'
import updateController from '../controllers/record/updateController.js'
import removeController from '../controllers/record/removeController.js'
import { auth } from '../middlewares/auth.js'

const router = express.Router()

router.use(auth)
router.post('/', createController)
router.get('/list', listController)
router.get('/:id', getByIdController)
router.put('/:id', updateController)
router.delete('/:id', removeController)

export default router