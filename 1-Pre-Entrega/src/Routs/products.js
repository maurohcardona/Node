
import express from 'express'

import ProductManager from '../productmanager';
const producto = new ProductManager()



const routerProducts = express.Router();

routerProducts.get('/', async (req, res) => {
    let limit = req.query.limit;
    if (limit) {
        const primerosProductos = await producto.path.slice(0, limit)
        return (res.send({primerosProductos}))
    }
    
    res.render('home', {
        title: 'products',
        products: producto.path
    } )
})

routerProducts.get("/:pid", async (req, res) => {
    const pid = parseInt(req.params.pid);
    usuarioId = await producto.path.find(producto => producto.id === pid);
    if (!usuarioId) {
        return res.status(404).send('Producto no encontrado')
    } else {
        res.status(200).send({Producto: usuarioId})
    }
})

routerProducts.post('/', async (req, res) => {
    const newProduct = req.body
    const {stock, title, code, description, price, category} = newProduct
    if((!stock )) {
        res.status(500).send('Falta completar el stock')
    }else if(!title){
        res.status(500).send('Falta completar el titulo')
    }else if (!code){
        res.status(500).send('Falta completar el codigo')
    }else if(!description){
        res.status(500).send('Falta completar la descripcion')
    }else if (!price){
        res.status(500).send('Falta completar el precio')
    }else if(!category){
        res.status(500).send('Falta completar la categoria')
    }else if(producto.path.find(p => p.code === code)){
        res.status(500).send('El codigo ya existe')
    }else {
    producto.addproducts(newProduct)
    res.status(200).send({
        Message:'product added successfully',
        Product: producto.path.find(p => p.title === title)
    })
    }
})

routerProducts.put('/:pid', (req, res) => {
    const changeProduct = req.body
    const pid = parseInt(req.params.pid);
    const filtroId = producto.path.find(p => p.id === pid)
    if (!filtroId){
        res.status(404).end('El id no exixte')
    }
    const filteredarray = producto.path.filter(item => item.id !== filtroId)
        if(filteredarray.find(p => p.code === changeProduct.code  )){
            res.status(500).end('El codigo ya existe')
        }
    producto.updateProduct(pid,changeProduct)
    res.status(200).send({
        Message: 'product change successfully',
        Product: filtroId
    })
})

routerProducts.delete('/:pid', (req, res) => {
    const pid = parseInt(req.params.pid);
    const filtroId = producto.path.find(p => p.id === pid)
    if (!filtroId){
        res.status(404).end('El id no exixte')
    }
    producto.deleteProduct(pid)
    res.status(200).send('product deleted successfully')


})

export default routerProducts