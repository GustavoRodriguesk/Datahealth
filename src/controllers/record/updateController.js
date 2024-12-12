import { update } from "../../models/recordModel.js";

const updateController = async (req, res, next) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({
            error: "O parâmetro 'id' é obrigatório."
        });
    }

    try {
        const record = req.body;
        const result = await update({ id: Number(id), ...record });

        if (!result) {
            return res.status(400).json({
                error: "Erro ao atualizar o registro."
            });
        }

        return res.status(200).json({
            success: "Registro atualizado com sucesso!",
            record: result
        });
    } catch (error) {
        if (error?.code === "P2025") {
            return res.status(404).json({
                error: `Registro com o id ${id} não foi encontrado.`
            });
        }

        next(error);
    }
};

export default updateController;
