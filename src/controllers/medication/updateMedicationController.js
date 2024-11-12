import { updateMedication } from '../../models/medicationModel.js';

const updateMedicationController = async (req, res) => {
  const { id } = req.params;
  const medicationData = req.body;
  try {
    const updatedMedication = await updateMedication({ id: Number(id), ...medicationData });
    res.status(200).json(updatedMedication);
  } catch (error) {
    res.status(400).json({ message: "Erro ao atualizar medicamento", error: error.message });
  }
};

export { updateMedicationController };
