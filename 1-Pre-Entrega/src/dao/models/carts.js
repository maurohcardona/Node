import mongoose from "mongoose";
import db from "./db.js";

const collection = 'carts'

const schema = new mongoose.Schema({
    Cart: {

        type: [
            {
                cart: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "products"
                },
                quantity: {type: Number, default: 1},
            }
        ],

        default: []
    }
});


const cartModel = db.model(collection, schema);

export default cartModel;


