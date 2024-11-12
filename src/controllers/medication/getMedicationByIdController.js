import { getByIdMedication } from '../../models/medicationModel.js';

const getMedicationByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const medication = await getByIdMedication(Number(id));
    if (!medication) {
      return res.status(404).json({ message: "Medicamento não encontrado" });
    }
    res.status(200).json(medication);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar medicamento", error: error.message });
  }
};

export { getMedicationByIdController };
