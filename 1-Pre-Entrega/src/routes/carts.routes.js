import express from 'express';
import { getCarts, addCartByPoductId, deleteAllProducts, getCartById, createCart } from '../Controllers/cart.controller.js';


const cartRouter = express.Router()

cartRouter.post('/cart', createCart)

cartRouter.get('/carts', getCarts)

cartRouter.get('/carts/:cid/products/:pid', addCartByPoductId)

cartRouter.delete('/api/carts/:cid', deleteAllProducts)

cartRouter.get('/cart/:cid', getCartById);
    


export default cartRouter;