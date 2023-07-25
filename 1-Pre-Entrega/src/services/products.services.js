import productModel from "../models/products.js";


export const getProducts = async (filter, pages,limit, SORT) => await productModel.paginate(filter,{page: pages, limit: limit, sort:SORT});

export const createProduct = async (newProduct) => await productModel.create(newProduct);

export const updateProduct = async (idProduct, updateProduct) => await productModel.findByIdAndUpdate(idProduct, updateProduct, {new: true});

export const deleteProduct = async (idProduct) => await productModel.findByIdAndRemove(idProduct);

export const getProductById = async (idProduct) => await productModel.findById(idProduct);

export const updateStock = async(pid, quantity) => await productModel.updateOne(
    {_id: pid},
    { $inc: { Stock: - quantity } },
    { new: true }
)