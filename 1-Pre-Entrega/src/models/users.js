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
    }   
});

const userModel = new mongoose.model(collection, schema);
export default userModel;