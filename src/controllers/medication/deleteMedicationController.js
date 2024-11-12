import { deleteMedication } from '../../models/medicationModel.js';

const deleteMedicationController = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedMedication = await deleteMedication(Number(id));
    res.status(200).json({ message: "Medicamento deletado com sucesso", medication: deletedMedication });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar medicamento", error: error.message });
  }
};

export { deleteMedicationController };
