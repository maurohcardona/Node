import  express  from 'express';
import { __dirname, publics } from './utils.js';
import indexRouter from './routes/index.routes.js';
import { Server } from 'socket.io'
import { engine }  from "express-handlebars";
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import cookieParser from "cookie-parser";
import config from './config/config.js';
import { handleSocketEvents } from './Controllers/message.controller.js';
import conection from './config/db.config.js';

const app = express();

const port = config.server.port

app.engine('handlebars', engine())
app.set('views', __dirname + '/Views')
app.set('view engine', 'handlebars')

app.use(express.static(publics));
app.use(express.json());
app.use(express.urlencoded({ extended: true } )) 
app.use(cookieParser());


initializePassport();
app.use(passport.initialize());

app.use('/', indexRouter);

export const httpServer = app.listen(port, () =>{
    conection()
    console.log(`listening on port ${port}`);
})

const io = new Server(httpServer)
handleSocketEvents(io)







