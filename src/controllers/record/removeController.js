import { deleteRecord } from "../../models/recordModel.js"

const remove = async (req, res, next) => {
    const {id} = req.params
    try{
        const record = await deleteRecord(+id)

        return res.json({
            success: "Conta removida com sucesso!",
            record
        }) 
    }catch(error){
        if(error?.code === 'P2025')
            return res.status(404).json({
                error: `Conta com o id ${id}, não encontrado!`
            })
        next(error)
    }
}

export default remove