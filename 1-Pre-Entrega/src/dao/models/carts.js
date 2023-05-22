import mongoose from "mongoose";
import db from "./db.js";

const collection = 'carts'

const schema = new mongoose.Schema({
    Carts: {

        type: [
            {
                Carts: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "products"
                }
            }
        ],

        default: []
    }
});

schema.statics.getCarts = async function(carts) {
    try {
        const newCart = new this(carts);
        const result = await newCart.save();
        return result;
    } catch (err) {
        console.error('No se puede mostrar los carritos',err);
        throw err;
    }
}

const cartModel = db.model(collection, schema);

export default cartModel;


