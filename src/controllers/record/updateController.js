import { update } from "../../models/recordModel.js"

const updateController = async (req, res, next) => {
    const {id} = req.params
    try{
        const record = req.body
        record.id = +id

        const result = await update(record)

        if(!result)
            return res.status(401).json({
                error: "Erro ao criar atualizar!"
            })

        return res.json({
            success: "Conta atualizada com sucesso!",
            record: result
        })
    } catch(error) {
        if(error?.code === 'P2025')
            return res.status(404).json({
                error: `Conta com o id ${id}, não encontrado!`
            })
        next(error)
    }
}

export default updateController