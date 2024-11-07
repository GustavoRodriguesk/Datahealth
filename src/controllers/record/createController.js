import { create } from "../../models/recordModel.js"

const createController = async (req, res, next) => {
    try{
        const record = req.body
        const result = await create(record)

        if(!result)
            return res.status(401).json({
                error: "Erro ao criar conta!"
            })

        return res.json({
            success: "Conta criada com sucesso!",
            record: result
        })
    } catch(error) {
        next(error)
    }
}

export default createController