import { listUsers } from "../../models/userModel.js";  // Ajuste o caminho para o seu arquivo de modelo

const listUsersController = async (req, res) => {
    // Obter os parâmetros da query string
    const { page = 1, limit = 10 } = req.query;

    // Converter para números inteiros, já que os parâmetros vêm como strings
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    // Verificar se a página e o limite são válidos
    if (isNaN(pageNumber) || pageNumber < 1 || isNaN(limitNumber) || limitNumber < 1) {
        return res.status(400).json({
            success: false,
            message: 'Parâmetros inválidos. Certifique-se de que "page" e "limit" sejam números positivos.',
        });
    }

    try {
        // Chama a função listUsers do modelo com paginação
        const users = await listUsers(pageNumber, limitNumber);

        // Retorna os usuários com sucesso
        res.status(200).json({
            success: true,
            data: users,
        });
    } catch (error) {
        // Em caso de erro, retorna erro 500
        res.status(500).json({
            success: false,
            message: 'Erro ao listar usuários',
            error: error.message,
        });
    }
};

export default listUsersController;
