import  express  from 'express';
const app = express();
import path from 'path';
import __dirname from './utils.js';
import productRouter from './dao/Routs/products.js';
import cartRouter from './dao/Routs/carts.js';
import messageManager from './dao/Controllers/messagemanager.js';
import { Server } from 'socket.io'
import { engine }  from "express-handlebars";
import messageRouter from './dao/Routs/messages.js';

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

app.use('/', productRouter)
app.use('/', cartRouter)
app.use('/', messageRouter);


app.get('/api/', (req, res) => {
    res.send('Node curse');
})

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

