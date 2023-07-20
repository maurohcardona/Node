import productModel from "../models/products.js";


export const getProducts = async (filter, pages,limit, SORT) => await productModel.paginate(filter,{page: pages, limit: limit, sort:SORT});

export const createProduct = async (newProduct) => await productModel.create(newProduct);


