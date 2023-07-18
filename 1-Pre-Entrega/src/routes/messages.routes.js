import express from 'express';
import { createMessages, getMessages} from '../dao/Controllers/messagemanager.js'

const messageRouter = express.Router();

messageRouter.get('/chats', getMessages);

messageRouter.post('/chats', createMessages);

export default messageRouter;