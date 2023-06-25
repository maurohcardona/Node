import productModel from '../models/products.js';
class productManager {
    constructor() {

    }

    async createProduct(product) {

        let products = await productModel.create(product);
        return products;
    }

    async getProduct(limit = 10, page = 1 , category, sort ) {
        try {
            const filter = category? {Category:category} : {};  
            const SORT =  sort ? {Price:sort} : {Title: 1}
            const products = await productModel.paginate(filter,{page: page, limit: limit, sort:SORT});
            products.payload = 'productsado de los productos solicitados'
            products.status = 'Ok';
            products.prevLink = products.hasPrevPage?`http://localhost:8080/products?limit=6&page=${products.prevPage}`:'';
            products.nextLink = products.hasNextPage?`http://localhost:8080/products?limit=6&page=${products.nextPage}`:'';
            const detalles = {...products}
            delete detalles.docs
            return products
        } catch (err) {
            console.log('Error al obtener los productos', err)
        }
    }
}

export default productManager;