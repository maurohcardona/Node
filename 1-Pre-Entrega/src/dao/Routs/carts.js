import express from 'express';
import cartManager from '../Controllers/cartmanager.js';

const cartRouter = express.Router()

cartRouter.get('/carts', async (req, res) => {
    try{
        const CartManager = new cartManager();
        const carts = await CartManager.getCarts();
        res.status(200).send(carts)
    } catch(error){
        console.error('Error al obtener los productos:', error);
    }
})

cartRouter.post('/carts', async (req, res) => {
    let newCart = {
        Cart:[]
    }
    newCart =  req.body
    const CartManager = new cartManager();
    await CartManager.createCart(newCart);
    res.status(200).send('cart created');
})

export default cartRouter;