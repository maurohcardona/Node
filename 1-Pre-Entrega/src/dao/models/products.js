import mongoose from "mongoose";
import db from './db.js';
import mongoosepaginate from "mongoose-paginate-v2";

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


schema.plugin(mongoosepaginate)
const productModel = db.model(collection, schema);

export default productModel;
