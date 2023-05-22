import  express  from 'express'
//const ProductManager = require('../productmanager')
import ProductManager from '../productmanager'
const producto = new ProductManager()

const routerRealTimeProducts = express.Router()

routerRealTimeProducts.get('/', (req, res) => {
    res.render('realTimeProducts', {
        title: 'products',
        products: producto.path
    } )
})

export default routerRealTimeProducts