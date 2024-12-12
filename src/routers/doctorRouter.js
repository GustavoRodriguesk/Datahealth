import express from 'express'
import createDoctorController from '../controllers/doctor/createDoctor.js'
import updateDoctorController from '../controllers/doctor/updateDoctor.js'
import deleteDoctorController from '../controllers/doctor/deleteDoctor.js'
import listDoctorController from '../controllers/doctor/listDoctor.js'
const router = express.Router()

router.post('/', createDoctorController)
router.put('/:id', updateDoctorController)
router.delete('/:id', deleteDoctorController)
router.get('/list', listDoctorController)

export default router
