import { listDoctor } from "../../models/doctorModel.js"

const listDoctorController = async (req, res) => {
  try {
    const doctors = await prisma.doctor.findMany()
    return res.status(200).json(doctors)
  } catch (error) {
    return res.status(400).json({ message: 'Erro ao listar médicos', error: error.message })
  }
}

export default listDoctorController
