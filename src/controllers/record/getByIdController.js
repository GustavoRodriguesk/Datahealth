import { getByIdRecord } from "../../models/recordModel.js"

const getById = async (req, res, next) => {
    try{ 
        const {id} = req.params
        const record = await getByIdRecord(+id)

        if(!record)
            return res.status(404).json({
                error: `Conta com o id ${id}, não encontrado!`
            })

        return res.json({
            success: "Conta encontrada com sucesso!",
            record
        })
    } catch(error) {
        next(error)
    }
}

export default getById