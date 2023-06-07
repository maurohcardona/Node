import cartModel from "../models/carts.js";
import productModel from "../models/products.js";

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

    async getCartsById(cid, pid) {
        try{
            await cartModel.updateOne({_id: cid}, {$pull: { Cart: { cart: pid } }})
        } catch (err) {
            console.log('Error al obtener el carrito', err)
        }
    }

    async addCartByPoductId(cid, pid) {
        try{
            const cart = await cartModel.find({_id: cid});
            console.log(cart)
            cart[0].Cart.push({cart: pid});      
            console.log(cart[0].Cart)
            await cartModel.updateOne({_id: cid}, cart[0]); 
        } catch (err) {
            console.log('Error agregar al carrito', err)
        }
    }

    async addOnlyCuontity (cid, pid, quantity) {
        try{
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
            const cart = await cartModel.find({_id: cid}).populate('Cart.cart')
            return cart
        } catch (err) {
            console.log('Error al mostrar el carrito', err)
        }
    }

    
    
}


export default cartManager;