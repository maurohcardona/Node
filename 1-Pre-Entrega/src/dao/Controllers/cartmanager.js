import cartService from "../services/cart.services.js";

const cartDB = new cartService();
    

export const createCart = async(req, res) => {
    let result = await cartDB.createCart()
    return result;
}

export const getCarts = async(req, res) => {
    try {
        const carts = await cartDB.getCarts();
        res.status(200).send(carts)
    } catch (err) {
        console.log('Error al obtener los productos', err)
    }
}

export const getCartById = async(req, res) => {
    try{
        const cid = req.params.cid;
        const cart = await cartDB.getCompleteCart(cid);
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
        const idcart = await cartDB.getCartById(cid);
        const isInCart = idcart.Cart.some(product => (product.cart).toString() === pid);
        if(isInCart) {
            await cartDB.addOnlyQuantity(cid, pid);
            await cartDB.getCompleteCart(cid);
            res.status(200).redirect('/products?limit=6');
            return
        }
        await cartDB.addCartByProductId(cid, pid);
        await cartDB.getCompleteCart(cid);
        res.status(200).redirect('/products?limit=6');
    } catch (err) {
        console.log('Error agregar al carrito', err)
    }
}

export const deleteAllProducts = async(req, res) => {
    try{
        const { cid } = req.params;
        await cartDB.deleteProductsCart(cid)
        res.status(200).send('products removed');
    } catch (err) {
        console.log('Error al eliminar los productos del carrito', err)
    }
}




    
    