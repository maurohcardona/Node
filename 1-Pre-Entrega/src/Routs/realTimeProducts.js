const express = require('express')
const ProductManager = require('../productmanager')
const producto = new ProductManager()

const routerRealTimeProducts = express.Router()

routerRealTimeProducts.get('/', (req, res) => {
    res.render('realTimeProducts', {
        title: 'products',
        products: producto.path
    } )
})

module.exports =  routerRealTimeProducts