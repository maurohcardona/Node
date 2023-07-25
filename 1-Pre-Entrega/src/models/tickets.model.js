import mongoose from "mongoose";

const collection = 'tickets';

const schema = new mongoose.Schema ({
    code:{
        type: String,
        required: true,
        unique: true,
    },
    amount:{
        type: Number,
        required: true,
    },
    purchaser:{
        type: String,
        required: true,
    },
    createdAt:{ 
        type: Date, 
        default: Date.now, 
    }
}) 

const ticketsModel = new mongoose.model(collection, schema);

export default ticketsModel;