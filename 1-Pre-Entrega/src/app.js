const express = require('express');
const app = express();
const routerProducts = require('./Routs/products.js')
const routerCarts = require('./Routs/carts.js')
const routerRealTimeProducts = require('./Routs/realTimeProducts.js')
const PORT = 8080
const { Server } = require('socket.io')
const ProductManager = require('./productmanager')
const producto = new ProductManager()

const { engine } = require('express-handlebars')

app.engine('handlebars', engine())
app.set('views', __dirname + '/Views')
app.set('view engine', 'handlebars')

app.use(express.json());
app.use(express.urlencoded({ extended: true } )) 

app.use('/api/products', routerProducts)
app.use('/api/carts', routerCarts)
app.use ('/realtimeproducts', routerRealTimeProducts )
app.use(express.static(__dirname + '/Public'))

app.get('/api/', (req, res) => {
    res.send('Node curse');
})

const httpServer = app.listen(PORT, () =>{
    console.log(`listening on port ${PORT}`);
})

const socketServer = new Server(httpServer)

socketServer.on('connection', (socket) => {
    console.log('New connection')   

    socket.on('newProduct', data => {
        producto.addproducts(data)
        socket.emit('sendProducts', producto.path)
    })

    socket.on('deleteProduct', id => {
        producto.deleteProduct(id)
        socket.emit('senddelete', producto.path.filter (p => p.id !== id))
    })
    
})

