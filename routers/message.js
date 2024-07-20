import express from 'express';
import {v4 as uuidv4} from 'uuid';

const router = express.Router();
const messages = []

//Criação mensagens
router.post('/message', async (req, res) => {
    const {tille, description} = req.body;

    if(!tille || !description) {
        res.status(400).json({ message: `Informe o titulo ou a descrição`})
    }
    const newMessage = {
        id: uuidv4(),
        tille,
        description
    }

    messages.push(newMessage);
    res.status(201).json({ message: `Mensagem criada com sucesso`, newMessage});

})

//Ler mensagens criadas
router.get('/message/:email', (req, res) => {
    const {email} = req.params;

    if(!email) {
        return res.status(404).json({ message: `Email não encontrado, verifique ou crie uma conta.`})
    }
    const userMessages = messages.filter(message => message.tille === email);
    res.status(200).json({ message: `Seja bem-vinde! ${JSON.stringify(userMessages)}`})
})

//Atualizar mensagem
router.put('/message/:id', (req, res) => {
    const {id} = req.params;
    const {tille, description} = req.body;

    if(!tille ||!description) {
        return res.status(400).json({ message: `Informe o titulo ou a descrição`})
    }
    const updatedMessage = messages.find(message => message.id === id);
    if(!updatedMessage) {
        return res.status(404).json({ message: `Mensagem não encontrada, verifique o ID.`})
    }

    updatedMessage.tille = tille;
    updatedMessage.description = description;

    res.status(200).json({ message: `Mensagem atualizada com sucesso`, updatedMessage});
})

//Deletar mensagem
router.delete('/message/:id', (req, res) => {
    const {id} = req.params;

    const updatedMessages = messages.filter(message => message.id!== id);

    if(updatedMessages.length === messages.length) {
        return res.status(404).json({ message: `Mensagem não encontrada, verifique o ID.`})
    }

    res.status(200).json({ message: `Mensagem deletada com sucesso`, updatedMessages});
})

export default router