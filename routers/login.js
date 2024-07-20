import express from 'express'
import bcrypt from 'bcrypt'

const router = express.Router()
//Login usuário
router.post('/login', async (req, res) => {
    const {email, password} = req.body

    const user = users.find(user => user.email === email)

    if (!user) {
        return res.status(404).json({
            message: '" Email não encontrado, verifique ou crie uma conta'
        })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
        return res.status(400).json({
            message: 'Insira uma senha válida'
        })
    }

    res.status(200).json({
        message: `Seja bem vindo ${users.name}! Pessoa usuária logada com sucesso!`,
        userId: user.id
    })
})

export default router