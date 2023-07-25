import * as cartService from "../services/cart.services.js";
import * as ticketService from "../services/ticket.services.js";
import { checkStocks, createTicket } from "../libs/cart.libs.js";
    

export const createCart = async(req, res) => {
    try{
        const newCart = req.body;
        const hasStock = await checkStocks(newCart.Cart);
        if (hasStock !== 'ok') throw new Error (hasStock);
            await cartService.createCart(newCart);
            const ticket = await createTicket(newCart);
            await ticketService.createTicket(ticket);
            res.status(200).send('Cart created successfully');
        
        
    } catch(error) {
        return res.status(500).send(error.message);
        
    }
    
}

export const getCarts = async(req, res) => {
    try {
        const carts = await cartService.getCarts();
        res.status(200).send(carts)
    } catch (err) {
        console.log('Error al obtener los productos', err)
    }
}

export const getCartById = async(req, res) => {
    try{
        const cid = req.params.cid;
        const cart = await cartService.getCompleteCart(cid);
        const newProducts = cart.Cart.map(data => {
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
    } catch (err) {
        console.log(err);
    }
};
    

export const addCartByPoductId = async(req, res) => {
    try{
        const { cid, pid} = req.params
        const idcart = await cartService.getCartById(cid);
        const isInCart = idcart.Cart.some(product => (product.cart).toString() === pid);
        if(isInCart) {
            await cartService.addOnlyQuantity(cid, pid);
            await cartService.getCompleteCart(cid);
            res.status(200).redirect('/products?limit=6');
            return
        }
        await cartService.addCartByProductId(cid, pid);
        await cartService.getCompleteCart(cid);
        res.status(200).redirect('/products?limit=6');
    } catch (err) {
        console.log('Error agregar al carrito', err)
    }
}

export const deleteAllProducts = async(req, res) => {
    try{
        const { cid } = req.params;
        await cartService.deleteProductsCart(cid)
        res.status(200).send('products removed');
    } catch (err) {
        console.log('Error al eliminar los productos del carrito', err)
    }
}




    
    