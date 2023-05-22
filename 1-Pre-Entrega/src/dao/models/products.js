import mongoose from "mongoose";
import db from './db.js';


const collection = 'products';

const schema = new mongoose.Schema({
    Title: {
        type: String,
        //required: true,
    },
    Description: {
        type: String,
        //required: true,
    },
    Price: {
        type: Number,
        //required: true,
    },

    Thumbnail: {
        type: String,
        //required: true,
    },
    Code: {
        type: Number,
        //required: true,
    },
    Stock: {
        type: Number,
        //required: true,
    },
    Category: {
        type: String,
        //required: true,
    }

});

schema.statics.createProduct = async function (product) {
    try {
        const newProduct = new this(product);
        const result = await newProduct.save();
        return result;


    } catch (error) {
        console.error('Error al crear producto:', error);
        throw error;
    }
};




const productModel = db.model(collection, schema);

export default productModel;
