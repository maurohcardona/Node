import cartModel from "../models/carts.js";
import MongoSingleton from "../../config/db.config.js";

class cartService {

    constructor() {
        const db = MongoSingleton.getIstance();
    };

    createCart = async() => await cartModel.create();

    getCarts = async() => await cartModel.find({}).lean();

    getCartById = async(id) => await cartModel.findById(id);

    addCartByProductId = async(cid, pid) => await cartModel.updateOne({_id: cid}, {$push: {products: pid}});

    updateCart = async(cid, pid) => await cartModel.updateOne(
        {_id: cid, 'Cart.cart':pid},
        { $set: { 'Cart.$.quantity': quantity } },
        { new: true }
    )

    deleteProductsCart = async(cid) => await cartModel.findOneAndUpdate(
        { _id: cid },
        { $set: { Cart: [] } },
        { new: true }
    );

    getCompleteCart = async(cid) => await cartModel.findById(cid).populate('Cart.cart')

    addOnlyQuantity = async(cid, pid, quantity) => {
        try{
            if (quantity === undefined) {
                const cart = await cartModel.findById(cid);
                const product = cart.Cart.find(p => p.cart.toString() === pid);
                if (product) {
                    quantity = product.quantity + 1;
                }
            }
            await cartModel.updateCart(cid, pid)
        }catch (err) {
            console.log('Error al modificar la cantidad', err)
        }
    }

}

export default cartService;