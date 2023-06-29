import cartModel from "../models/carts.js";


class cartManager {
    constructor(){

    }

    async createCart(cart) {
        let result = await cartModel.create(cart);
        return result;
    }

    async getCarts() {
        try {
            const carts = await cartModel.find({}).lean();
            return carts
        } catch (err) {
            console.log('Error al obtener los productos', err)
        }
    }

    async getCartsById(cid) {
        try{
            const cart = await cartModel.findById(cid)
            return cart
        } catch (err) {
            console.log('Error al obtener el carrito', err)
        }
    }

    async addCartByPoductId(cid, pid) {
        try{
            const cart = await cartModel.find({_id: cid});
            cart[0].Cart.push({cart: pid});      
            await cartModel.updateOne({_id: cid}, cart[0]); 
        } catch (err) {
            console.log('Error agregar al carrito', err)
        }
    }

    async addOnlyCuontity (cid, pid, quantity) {
        try{
            if (quantity === undefined) {
                const cart = await cartModel.findById(cid);
                const product = cart.Cart.find(p => p.cart.toString() === pid);
                if (product) {
                    quantity = product.quantity + 1;
                }
            }
            await cartModel.findOneAndUpdate(
                {_id: cid, 'Cart.cart':pid},
                { $set: { 'Cart.$.quantity': quantity } },
                { new: true }
            )
        }catch (err) {
            console.log('Error al modificar la cantidad', err)
        }
    }

    async deleteAllProducts (cid) {
        try{
            await cartModel.findOneAndUpdate(
                { _id: cid },
                { $set: { Cart: [] } },
                { new: true }
              );
        } catch (err) {
            console.log('Error al eliminar los productos del carrito', err)
        }
    }

    async getCompleteCart (cid) {
        try{
            const cart = await cartModel.findById(cid).populate('Cart.cart')
            return cart.Cart
        } catch (err) {
            console.log('Error al mostrar el carrito', err)
        }
    }

    
    
}


export default cartManager;