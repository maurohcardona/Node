import express from 'express';
import { createMessages, getMessages} from '../Controllers/message.controller.js'
import { hasToken, isAdmin } from '../middlewares/user.middleware.js';

const messageRouter = express.Router();

messageRouter.get('/chats', hasToken, getMessages);

messageRouter.post('/chats', hasToken('jwt'), createMessages);

export default messageRouter;