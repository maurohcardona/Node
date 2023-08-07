import loggerTest from '../Controllers/log.controller.js';
import express from 'express';

const logRouter = express.Router();

logRouter.get('/', loggerTest);

export default logRouter;