import { createMedication } from '../../models/medicationModel.js';

const createMedicationController = async (req, res) => {
  const medicationData = req.body;
  try {
    const createdMedication = await createMedication(medicationData);
    res.status(201).json(createdMedication);
  } catch (error) {
    res.status(400).json({ message: "Erro ao criar medicamento", error: error.message });
  }
};

export { createMedicationController };
