import  express  from "express";
import { uploader } from "../utils.js";
import { isAuthenticated } from "./users.js";
import { passportCall } from "../middlewares/user.middleware.js";

const productRouter = express.Router();

import productManager from '../dao/Controllers/productmanager.js';

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

productRouter.get('/products',passportCall('jwt'), async(req, res) => {
    try{
        const limit = req.query.limit
        const pages = req.query.page
        const category = req.query.category
        const sort = req.query.sort
        const ProductManager = new productManager();
        const products = await ProductManager.getProduct(limit, pages, category, sort);
        const cid = req.user.cart;
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
        //const { firstname, lastname, email, age } = req.session.user;
        //const rol = req.session.admin
        const {prevLink, nextLink, totalDocs, page} = products
        res.status(200).render('realTimeProducts', {products: newProducts, page, totalDocs, prevLink, nextLink})
    } catch(error){
        console.error('Error al obtener los productos:', error);
    }
    
})

export default productRouter; 

