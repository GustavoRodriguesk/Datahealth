import { userValidateToLogin, getByEmail} from "../../models/userModel.js"
import { createSession } from "../../models/sessionModel.js"
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"
import { SECRET_KEY } from "../../config.js"

const login = async (req, res, next) => {
    try{
        const login = req.body

        const loginValidated = userValidateToLogin(login)
        if(loginValidated?.error)
            return res.status(401).json({
                error: "Erro ao logar! (dados de entrada inválidos)",
            })
  
        const {email, pass} = loginValidated.data
        
        const user = await getByEmail(email)

        if(!user)
            return res.status(401).json({
                error: "Email ou senha inválida! (email não encontrado)",
            })

        const passIsValid = bcrypt.compareSync(pass, user.pass)

        if(!passIsValid)
            return res.status(401).json({
                error: "Email ou senha inválida! (senha não bate com hash)",
            })

        const token = jwt.sign({public_id: user.public_id, name: user.name }, SECRET_KEY, { expiresIn: 600 * 5 })

        await createSession(user.id, token)

        return res.json({
            success: "Login realizado com sucesso!",
            accessToken: token,
            user: {
                id: user.id,
                public_id: user.public_id,
                name: user.name,
                avatar: user.avatar,
                email: user.email
            }
        })
        
    } catch(error) {
        next(error)
    }
}

export default login