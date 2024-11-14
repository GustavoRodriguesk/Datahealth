import { deleteDoctor } from '../../models/doctorModel.js'

const deleteDoctorController = async (req, res) => {
  const { id } = req.params

  try {
    const deletedDoctor = await deleteDoctor(Number(id))
    return res.status(200).json(deletedDoctor)
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

export default deleteDoctorController
