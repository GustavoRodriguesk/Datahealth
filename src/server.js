import express from 'express'
import cors from 'cors'
import authRouter from './routers/authRouter.js'
import recordRouter from './routers/recordRouter.js'
import medicationRouter from './routers/medicationRouter.js'

import errorHandler from './middlewares/errorHandler.js'
import welcome from './controllers/welcome.js'
import { ENVIRONMENT, PORT, HOST } from './config.js'
import logger from './middlewares/logger.js'

const app = express()

app.use(logger)
app.use(cors())
app.use(express.json())

app.get('/', welcome)

app.use('/auth', authRouter)

app.use('/record', recordRouter)
app.use('/medication', medicationRouter)


app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Servidor Rodando no ambiente ${ENVIRONMENT} em ${ ENVIRONMENT == 'production' ? HOST : HOST+':'+PORT }`)
})