import express from 'express';
import cartManager from '../dao/Controllers/cartmanager.js';

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

cartRouter.delete('/api/carts/:cid/products/:pid', async (req, res) =>{
    const cid = req.params.cid
    const pid = req.params.pid
    const CartManager = new cartManager();
    await CartManager.getCartsById(cid, pid);
    res.status(200).send('cart deleted');
})

cartRouter.get('/carts/:cid/products/:pid', async (req, res) =>{
    const cid = req.params.cid
    const pid = req.params.pid
    const CartManager = new cartManager();
    await CartManager.addCartByPoductId(cid, pid);
    res.status(200).send('product added');
})

cartRouter.put('/api/carts/:cid/products/:pid', async (req, res) =>{
    const {cid, pid} = req.params
    const {quantity} = req.body
    const CartManager = new cartManager();
    await CartManager.addOnlyCuontity(cid, pid, quantity);
    res.status(200).send('quantity modified');
})

cartRouter.delete('/api/carts/:cid', async (req, res) => {
    const { cid } = req.params;
    const CartManager = new cartManager();
    await CartManager.deleteAllProducts(cid);
    res.status(200).send('products removed');   
})

cartRouter.get('/api/carts/:cid', async (req, res) => {
    const {cid} = req.params;
    const CartManager = new cartManager();
    const cart = await CartManager.getCompleteCart(cid);    
    res.status(200).send(cart);
});




export default cartRouter;