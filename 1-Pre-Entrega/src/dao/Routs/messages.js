import express from 'express';
import messageManager from '../Controllers/messagemanager.js';

const messageRouter = express.Router();

messageRouter.get('/chats', (req, res) => {
    res.render('chats')
})

messageRouter.post('/chats', async(req, res) => {
    try {
        const {user, message} = req.body
        const newMessage = {user, message}
        const MessageManager = new messageManager();
        await MessageManager.createMessage(newMessage);
        res.status(200).send('Mensaje enviado')
    } catch (error) {
        console.error('No se puede mandar el mensaje', error);
    }
})

export default messageRouter;