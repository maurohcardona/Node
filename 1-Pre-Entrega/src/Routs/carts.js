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
    const idcart = await CartManager.getCartsById(cid);
    const isInCart = idcart.Cart.some(product => (product.cart).toString() === pid);
    if(isInCart) {
        await CartManager.addOnlyCuontity(cid, pid);
        const cart = await CartManager.getCompleteCart(cid);
        res.status(200).redirect('/products?limit=6');
        return
    }
    await CartManager.addCartByPoductId(cid, pid);
    const cart = await CartManager.getCompleteCart(cid);
    //res.status(200).send(cart);
    res.status(200).redirect('/products?limit=6');
})

cartRouter.post('/api/carts/:cid/products/:pid', async (req, res) =>{
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

cartRouter.get('/cart/:cid', async (req, res) => {
    try{
        const cid = req.params.cid;
        const CartManager = new cartManager();
        const cart = await CartManager.getCompleteCart(cid);
        const newProducts = cart.map(data => {
            return {
                Title: data.cart.Title,
                Description: data.cart.Description,
                Price: data.cart.Price,
                Stock: data.cart.Stock,
                Category: data.cart.Category,
                Thumbnail: data.cart.Thumbnail,
                id:data.cart._id,
                quantity:data.quantity
            }
    })     
    res.status(200).render('cart', {products: newProducts});
    //res.status(200).send(newProducts)
    } catch (err) {
        console.log(err);
    }
});
    




export default cartRouter;