import  express  from 'express';
const app = express();
import path from 'path';
import productManager from './dao/Controllers/productmanager.js';
//const routerProducts = require('./Routs/products.js')
//import routerProducts from './Routs/products.js';
//const routerCarts = require('./Routs/carts.js')
//import routerCarts from './Routs/carts.js';
//const routerRealTimeProducts = require('./Routs/realTimeProducts.js')
//import routerRealTimeProducts from './Routs/realTimeProducts.js'
const PORT = 8080
import __dirname from './utils.js';
import productRouter from './dao/Routs/products.js';
//const { Server } = require('socket.io')
import { Server } from 'socket.io'
//const ProductManager = require('./productmanager')
//import ProductManager from './productmanager.js';
//const producto = new ProductManager()

import { engine }  from "express-handlebars";

const publics = path.join(__dirname, './public');

app.engine('handlebars', engine())
app.set('views', __dirname + '/Views')
app.set('view engine', 'handlebars')

app.use(express.static(publics));
app.use(express.json());
app.use(express.urlencoded({ extended: true } )) 

app.use('/', productRouter)
//app.use('/api/carts', routerCarts)
//app.use ('/realtimeproducts', routerRealTimeProducts )
//app.use(express.static(__dirname + '/Public'))

app.get('/api/', (req, res) => {
    res.send('Node curse');
})

const httpServer = app.listen(PORT, () =>{
    console.log(`listening on port ${PORT}`);
})

// const socketServer = new Server(httpServer)

// socketServer.on('connection',async (socket) => {
//     console.log('New connection')   

//     socket.on('newProduct',async data => {
//         const ProductManager = new productManager();
//        await ProductManager.createProduct(data);
//         const productos = await ProductManager.getProduct()
//         socket.emit('sendProducts', productos);
//         console.log(productos);
//     })

    // socket.on('deleteProduct', id => {
    //     producto.deleteProduct(id)
    //     socket.emit('senddelete', producto.path.filter (p => p.id !== id))
    // })
    
//})

