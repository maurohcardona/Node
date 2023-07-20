import express from 'express';
import { createMessages, getMessages} from '../Controllers/message.controller.js'

const messageRouter = express.Router();

messageRouter.get('/chats', getMessages);

messageRouter.post('/chats', createMessages);

export default messageRouter;