import productService from "../services/products.services.js";

const productsDB = new productService();
    
    // const createProduct = async(product) {

    //     let products = await productModel.create(product);
    //     return products;
    // }

    const getProduct = async (req, res)  =>{
        try {
            
                const { limit, pages, category, sort } = req.query;
                const filter = category? {Category:category} : {};  
                const SORT =  sort ? {Price:sort} : {Title: 1}
                const cid = req.user.cart;
                const products = await productsDB.getProducts(filter, pages, limit, SORT);
                products.prevLink = products.hasPrevPage?`http://localhost:8080/products?limit=6&page=${products.prevPage}`:'';
                products.nextLink = products.hasNextPage?`http://localhost:8080/products?limit=6&page=${products.nextPage}`:'';
                const newProducts = products.docs.map(data => {
                                return {
                                    Title: data.Title,
                                    Description: data.Description,
                                    Price: data.Price,
                                    Stock: data.Stock,
                                    Category: data.Category,
                                    Thumbnail: data.Thumbnail,
                                    id:data._id,
                                    cid,
                                }
                            })
                const { prevLink, nextLink, totalDocs, page } = products
                res.status(200).render('realTimeProducts', {products: newProducts, page, totalDocs, prevLink, nextLink})
            
        } catch (err) {
            console.log('Error al obtener los productos', err)
        }
    }


export default getProduct;
