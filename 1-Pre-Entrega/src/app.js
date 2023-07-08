import  express  from 'express';
import path from 'path';
import __dirname from './utils.js';
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
import dotenv from 'dotenv';
import  Jwt  from 'jsonwebtoken';
dotenv.config();

const app = express();

const dbPassword = process.env.DB_PASSWORD;


//Esto va con filesystem
//import routerRealTimeProducts from './Routs/realTimeProducts.js'
//import routerCarts from './Routs/carts.js';
//import ProductManager from './productmanager.js';
//const producto = new ProductManager()
//import routerCarts from './Routs/carts.js';
//app.use('/api/carts', routerCarts)
//app.use ('/realtimeproducts', routerRealTimeProducts )
//app.use(express.static(__dirname + '/Public'))


const PORT = 8080

const publics = path.join(__dirname, 'Public');


app.engine('handlebars', engine())
app.set('views', __dirname + '/Views')
app.set('view engine', 'handlebars')

app.use(express.static(publics));
app.use(express.json());
app.use(express.urlencoded({ extended: true } )) 
app.use(cookieParser());
// app.use(session({
//     store:MongoStore.create({
//         mongoUrl:`mongodb+srv://maurohcardona:${dbPassword}@mauroc.dilwd5c.mongodb.net/?retryWrites=true&w=majority`, 
//         mongoOptions:{useNewUrlParser:true, useUnifiedTopology:true}
//     }),
//     secret:'maurosecret',
//     resave: true,
//     saveUninitialized: true
// }))

initializePassport();
app.use(passport.initialize());


app.use ((req, res, next) => {
    if (req.cookies && req.cookies.cookieToken) {
        const cookieValue = req.cookies.cookieToken;
        Jwt.verify(cookieValue, 'SecretCode', (error, credentials) => {
            app.locals.cookieValue = credentials;   
        })
    }
    next();  
})

app.use('/', productRouter)
app.use('/', cartRouter)
app.use('/', messageRouter);
app.use('/', userRouter);


const httpServer = app.listen(PORT, () =>{
    console.log(`listening on port ${PORT}`);
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




