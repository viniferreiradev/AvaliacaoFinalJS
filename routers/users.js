import express from 'express'
import {v4 as uuidv4} from 'uuid'
import bcrypt from 'bcrypt'

import { validateUserRegistration } from '../middleware/validation'

const router = express.Router()
const users = []

//Criação usuário
router.post('/signUp', validateUserRegistration, async (req, res) => {
    const { name, email, password } = req.body
    const emailAlredyRegistred = users.find(user => user.email === email)
    
    if (emailAlredyRegistred) {
        return res.status(400).json({
            message: 'Email já cadastrado, insira outro.'
        })
    }
    
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = {
        id: uuidv4(),
        name,
        email,
        password: hashedPassword
    }

    users.push(newUser)
    res.status(201).json({ message: `Seja bem vindo ${name}! Pessoa usuária registrada com sucesso!`})

})

export default router