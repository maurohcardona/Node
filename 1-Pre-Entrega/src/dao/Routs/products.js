import  express  from "express";
const productRouter = express.Router();

import productManager from "../Controllers/productmanager.js";

//productRouter.get('/products', (req, res) => {res.render('realTimeProducts')})

productRouter.post('/products',async (req, res) => {
    const {Title, Description, Price, Stock, Thumbnail,Code, Category} = req.body;
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
        const newProduct = {Title, Description, Price, Stock, Thumbnail, Category}
        const ProductManager = new productManager();
        await ProductManager.createProduct(newProduct);
        const products = await ProductManager.getProduct()
        res.status(200).render('realTimeProducts', {products: products})
    }
})

productRouter.get('/products',async(req, res) => {
    try{
        const ProductManager = new productManager();
        const products = await ProductManager.getProduct();
        res.status(200).render('realTimeProducts', {products: products})
    } catch(error){
        console.error('Error al obtener los productos:', error);
    }
    
})

export default productRouter; 

