import mongoose from "mongoose";

const collection = 'users';

const schema = new mongoose.Schema({
    firstname:String,
    lastname:String,
    email:String,
    age: Number,
    password: String,
    rol: {
        type: String,
        default: "user"
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "carts"
    }    
});

const userModel = mongoose.model(collection, schema);
export default userModel;