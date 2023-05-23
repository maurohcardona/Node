import mongoose from "mongoose";
import db from './db.js';


const collection = 'products';

const schema = new mongoose.Schema({
    Title: {
        type: String,
        
    },
    Description: {
        type: String,
        
    },
    Price: {
        type: Number,
        
    },

    Thumbnail: {
        type: String,
        
    },
    Code: {
        type: Number,
        
    },
    Stock: {
        type: Number,
        
    },
    Category: {
        type: String,
        
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
