const express = require('express');
const app = express();
const routerProducts = require('./Routs/products.js')
const routerCarts = require('./Routs/carts.js')
const PORT = 8080

const { engine } = require('express-handlebars')
app.engine('handlebars', engine())
app.set('views', __dirname + '/Views')
app.set('view engine', 'handlebars')

app.use(express.json());
app.use(express.urlencoded({ extended: true } )) 

app.use('/api/products', routerProducts)
app.use('/api/carts', routerCarts)

app.get('/api/', (req, res) => {
    res.send('Node curse');
})

app.listen(PORT, () =>{
    console.log(`listening on port ${PORT}`);
})