const express = require('express');
const CartManager = require('../cartManager')
const cart = new CartManager()
const ProductManager = require('../productmanager')
const producto = new ProductManager()

const routerCarts = express.Router()

routerCarts.post('/', (req, res) => {
    cart.addCart()
    res.status(200).send('Cart added successfully')
})

routerCarts.get('/:cid', async(req, res) => {   
    const cid = parseInt(req.params.cid)
    const viewCart = await cart.path.find(e => e.id === cid)
    if(!viewCart){
        res.status(404).end('Cart not found')
    }else{
        res.status(200).send({cart: viewCart})
    }
})

routerCarts.post('/:cid/product/:pid', async (req, res) => {
    const cid = parseInt(req.params.cid)
    const pid = parseInt(req.params.pid)
    cart.addProductToCart(cid, pid)
    const viewCart = await cart.path.find(e => e.id === cid)
    const viewProduct = await producto.path.find(e => e.id === pid)
    if (!viewCart) {
        res.status(404).end('the cart doesnt exist')
    }else if (!viewProduct) {
        res.status(404).end('The product doesnt exist')
    }else{
        res.status(200).send({
            Mesaje: 'Product added successfully',
            cart: viewCart
        })
    }
})
/
module.exports = routerCarts