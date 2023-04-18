const express = require('express')
const ProductManager = require('../productmanager')
const producto = new ProductManager()

const routerProducts = express.Router();

routerProducts.get('/', async (req, res) => {
    let limit = req.query.limit;
    if (limit) {
        const primerosProductos = await producto.path.slice(0, limit)
        return (res.send({primerosProductos}))
    }
    
    res.send({producto});
})

routerProducts.get("/:pid", async (req, res) => {
    const pid = parseInt(req.params.pid);
    usuarioId = await producto.path.find(producto => producto.id === pid);
    if (!usuarioId) {
        return res.status(404).send('Usuario no encontrado')
    } else {
        res.send({usuarioId})
    }
})

module.exports = routerProducts