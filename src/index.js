import express from 'express'
import cors from 'cors'

import usersRouter from '../routers/users'
import loginRouter from '../routers/login'
import messageRouter from '../routers/message';

const porta = 8080
const app = express()
app.use(express.json())
app.use(cors())


app.get('/', (req, res) => {
    res.status(200).send('Bem vindo à aplicação - Avaliação Final');
})

app.use('/users', usersRouter)
app.use('/message', messageRouter)
app.use('/login', loginRouter)

app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`)
})