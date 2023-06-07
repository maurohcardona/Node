import  express  from "express";
import { uploader } from "../../utils.js";
const productRouter = express.Router();

import productManager from "../Controllers/productmanager.js";

productRouter.post('/products', uploader.single('Thumbnail'), async (req, res) => {
    const {Title, Description, Price, Stock, Code, Category} = req.body;
    const filename = req.file.filename;
    if((!Stock )) {
        res.status(500).send('Falta completar el stock')
    }else if(!Title){
        res.status(500).send('Falta completar el titulo')
    }else if (!Code){
        res.status(500).send('Falta completar el codigo')
    }else if(!Description){
        res.status(500).send('Falta completar la descripcion')
    }else if (!Price){
        res.status(500).send('Falta completar el precio')
    }else if(!Category){
        res.status(500).send('Falta completar la categoria')
    }else {
        const newProduct = {Title, Description, Price, Stock, Thumbnail: filename, Category}
        const ProductManager = new productManager();
        await ProductManager.createProduct(newProduct);
        const products = await ProductManager.getProduct()
        res.status(200).render('realTimeProducts', {products: products})
    }
})

productRouter.get('/products',async(req, res) => {
    try{
        const limit = req.query.limit
        const page = req.query.page
        const category = req.query.category
        const sort = req.query.sort
        const ProductManager = new productManager();
        const products = await ProductManager.getProduct(limit, page, category, sort);
        const newProducts = products.docs.map(data => {
            //console.log(data._id)
            return {
                Title: data.Title,
                Description: data.Description,
                Price: data.Price,
                Stock: data.Stock,
                Category: data.Category,
                Thumbnail: data.Thumbnail,
                id:data._id
            }
        })
        res.status(200).render('realTimeProducts', {products: newProducts})
    } catch(error){
        console.error('Error al obtener los productos:', error);
    }
    
})

export default productRouter; 

