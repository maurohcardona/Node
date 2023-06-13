import mongoose from "mongoose";

const collection = 'users';

const schema = new mongoose.Schema({
    firstname:String,
    lastname:String,
    email:String,
    age: Number,
    password: String
});

const userModel = mongoose.model(collection, schema);
export default userModel;