import { createDoctor } from '../../models/doctorModel.js'

const createDoctorController = async (req, res) => {
  try {
    const doctorData = req.body
    const newDoctor = await createDoctor(doctorData)
    return res.status(201).json(newDoctor)
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

export default createDoctorController
