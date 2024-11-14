import { getDoctorById } from '../../models/doctorModel.js'

const getByIdDoctorController = async (req, res) => {
  const { id } = req.params

  try {
    const doctor = await getDoctorById(Number(id))
    if (!doctor) {
      return res.status(404).json({ message: 'Médico não encontrado' })
    }
    return res.status(200).json(doctor)
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

export default getByIdDoctorController
