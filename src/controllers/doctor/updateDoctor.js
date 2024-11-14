import { updateDoctor } from '../../models/doctorModel.js'

const updateDoctorController = async (req, res) => {
  const { id } = req.params
  const doctorData = req.body

  try {
    const updatedDoctor = await updateDoctor(Number(id), doctorData)
    return res.status(200).json(updatedDoctor)
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

export default updateDoctorController
