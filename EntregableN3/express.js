const express = require("express");
const app = express();
const port = 8080
const ProductManager = require('./productmanager')
const producto = new ProductManager()

app.use(express.urlencoded({ extended: true } )) 


app.get("/productos", async (req, res) => {
    let limit = req.query.limit;
    if (limit) {
        const primerosProductos = await producto.path.slice(0, limit)
        return (res.send({primerosProductos}))
    }
    
    res.send({producto});
})

app.get("/productos/:pid", async (req, res) => {
    const pid = parseInt(req.params.pid);
    usuarioId = await producto.path.find(producto => producto.id === pid);
    if (!usuarioId) {
        return res.status(404).send('Usuario no encontrado')
    } else {
        res.send({usuarioId})
    }
})

app.listen(port, () => {
    console.log('listening on port  ' + port);
});