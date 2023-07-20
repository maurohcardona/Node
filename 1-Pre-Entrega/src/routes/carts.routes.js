import express from 'express';
import { getCarts, addCartByPoductId, deleteAllProducts, getCartById } from '../Controllers/cart.controller.js';


const cartRouter = express.Router()

cartRouter.get('/carts', getCarts)

cartRouter.get('/carts/:cid/products/:pid', addCartByPoductId)

cartRouter.delete('/api/carts/:cid', deleteAllProducts)

cartRouter.get('/cart/:cid', getCartById);
    


export default cartRouter;