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
}

export default cartManager;