import  express  from 'express';
import { __dirname, publics } from './utils.js';
import productRouter from './Routs/products.js';
import cartRouter from './Routs/carts.js';
import messageManager from './dao/Controllers/messagemanager.js';
import userRouter from './Routs/users.js';
import { Server } from 'socket.io'
import { engine }  from "express-handlebars";
import messageRouter from './Routs/messages.js';
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import cookieParser from "cookie-parser";
import { credentials } from './middlewares/user.middleware.js';
import config from './config/config.js';

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

app.use(credentials(app))


app.use('/products', productRouter)
app.use('/', cartRouter)
app.use('/', messageRouter);
app.use('/', userRouter);


const httpServer = app.listen(port, () =>{
    console.log(`listening on port ${port}`);
})

const io = new Server(httpServer)


io.on('connection', socket => {
    console.log('New connection')   

    socket.on('message', async data => {
        const MessageManager  = new messageManager();
        await MessageManager.createMessage(data);
        const mensajes = await MessageManager.getMessage()
        io.emit('messages', mensajes);
    })  
})




