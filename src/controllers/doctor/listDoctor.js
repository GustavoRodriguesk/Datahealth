import { listDoctor } from "../../models/doctorModel.js";

const listDoctorController = async (req, res, next) => {
  try{
    const doctors = await listDoctor()
    return res.json({
        message: "Prontuarios listados com sucesso!",
        doctors
    })
} catch(error) {
    next(error)
}
}
export default listDoctorController;
