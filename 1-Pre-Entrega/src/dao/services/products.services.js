import productModel from "../models/products.js";
import MongoSingleton from "../../config/db.config.js";

class productService {
    constructor(){
        const db = MongoSingleton.getIstance();
    }

    getProducts = async (filter, pages,limit, SORT) => await productModel.paginate(filter,{page: pages, limit: limit, sort:SORT});

    createProduct = async (newProduct) => await productModel.create(newProduct);
}

export default productService;