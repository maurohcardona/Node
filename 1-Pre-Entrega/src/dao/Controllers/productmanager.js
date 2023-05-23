import productModel from '../models/products.js';
class productManager {
    constructor() {

    }

    async createProduct(product) {

        let result = await productModel.create(product);
        return result;
    }

    async getProduct() {
        try {
            const products = await productModel.find({}).lean();
            return products
        } catch (err) {
            console.log('Error al obtener los productos', err)
        }
    }
}

export default productManager;