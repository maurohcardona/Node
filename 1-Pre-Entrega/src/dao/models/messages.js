import mongoose from "mongoose";
import db from './db.js';

const collection = 'messages';

const schema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
})



const messageModel = db.model(collection, schema);

export default messageModel;
