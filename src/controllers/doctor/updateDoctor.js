import { updateDoctor } from '../../models/doctorModel.js';

const updateDoctorController = async (req, res) => {
  const { id } = req.params;
  const doctorData = req.body; 

  try {

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ message: "O parâmetro 'id' é obrigatório e deve ser um número válido." });
    }

    const updatedDoctor = await updateDoctor(Number(id), doctorData);
    return res.status(200).json(updatedDoctor);
  } catch (error) {

    if (error.message.startsWith("Erro de validação")) {
      return res.status(422).json({ message: error.message }); 
    }

    return res.status(400).json({ message: `Erro ao atualizar médico: ${error.message}` });
  }
};

export default updateDoctorController;
