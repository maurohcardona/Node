import productService from "../services/products.services.js";

const productsDB = new productService();
    
export const getProducts = async (req, res)  =>{
    try {
        const { limit, category, sort } = req.query;
        const pages = req.query.page;
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

export const createProduct = async(req, res) => {
    try {
        const {Title, Description, Price, Stock, Category, Thumbnail} = req.body;
        if((!Stock )) {
            res.status(500).send('Falta completar el stock')
        }else if(!Title){
            res.status(500).send('Falta completar el titulo')
        }else if(!Description){
            res.status(500).send('Falta completar la descripcion')
        }else if (!Price){
            res.status(500).send('Falta completar el precio')
        }else if(!Category){
            res.status(500).send('Falta completar la categoria')
        }else {
            const newProduct = {Title, Description, Price, Stock, Thumbnail, Category}
            await productsDB.createProduct(newProduct);
            res.status(200).send(newProduct);
        }
    } catch (err) {
        console.error(err);
    }
}






