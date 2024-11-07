import { listRecords } from "../../models/recordModel.js" 

const list = async (req, res, next) => {
    try{
        const records = await listRecords(req.userLogged.public_id)
        return res.json({
            message: "Prontuarios listados com sucesso!",
            records
        })
    } catch(error) {
        next(error)
    }
}

export default list