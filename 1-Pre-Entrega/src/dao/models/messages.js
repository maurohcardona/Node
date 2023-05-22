import mongoose from "mongoose";
import db from './db.js';

const collection = 'messages';

const schema = new mongoose.Schema({
    User: {
        type: String,
        required: true
    },
    Message: {
        type: String,
        required: true
    }
})

schema.statics.createMessage = async function(messages) {
    try {
        const newMessage = new this(messages);
        const result = await newMessage.save();
        return result;
    } catch (err) {
        console.error('No se puede mandar el mensaje',err);
        throw err;
    }
}

const messageModel = db.model(collection, schema);

export default messageModel;
