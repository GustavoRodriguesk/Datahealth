import { listMedications } from '../../models/medicationModel.js';

const getAllMedicationsController = async (req, res) => {
  try {
    const medications = await listMedications();
    res.status(200).json(medications);
  } catch (error) {
    res.status(500).json({ message: "Erro ao listar medicamentos", error: error.message });
  }
};

export { getAllMedicationsController };
