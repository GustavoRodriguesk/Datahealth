import { listUsers } from "../../models/userModel.js";  

const listUsersController = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    if (isNaN(pageNumber) || pageNumber < 1 || isNaN(limitNumber) || limitNumber < 1) {
        return res.status(400).json({
            success: false,
            message: 'Parâmetros inválidos. Certifique-se de que "page" e "limit" sejam números positivos.',
        });
    }

    try {
        const users = await listUsers(pageNumber, limitNumber);

        res.status(200).json({
            success: true,
            data: users,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao listar usuários',
            error: error.message,
        });
    }
};

export default listUsersController;
