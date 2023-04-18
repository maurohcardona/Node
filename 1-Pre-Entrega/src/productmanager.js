const fs = require('fs');


class ProductManager {

    constructor() {

        this.path = JSON.parse(fs.readFileSync('./products.json', 'utf-8'))
    }
     
    
    async addproducts(producto) {

        
       
        const id = this.path.length + 1
        
        const nuevoProducto = {
        id,
        title: producto.title,
        description: producto.description,
        price: producto.price,
        status: producto.status?? true,
        thumbnail: producto.thumbnail,
        code: producto.code,
        stock: producto.stock,
        category: producto.category
        }
        
        const {stock, title, code, description, price, category} = nuevoProducto
        if((!stock )) {
            console.log('Falta completar el stock')
        }else if(!title){
            console.log('Falta completar el titulo')
        }else if (!code){
            console.log('Falta completar el codigo')
        }else if(!description){
            console.log('Falta completar la descripcion')
        }else if (!price){
            console.log('Falta completar el precio')
        }else if (!category){
            console.log('Falta completar la categoria')
        }else if(this.path.find(p => p.code === code)){
            console.log('El codigo ya existe')
       }
        else  {
            this.path.push(nuevoProducto)
            const productos = JSON.stringify(this.path)
            await fs.promises.writeFile('./products.json', productos)
        }  
    }
    async getProductById(id) {
        const filtroId = await this.path.find(p => p.id === id)
        if(filtroId){
            console.log(filtroId)
        } else {
          console.log('No Existe el producto')
        }
    }
    async getProducts() {
       console.log(this.path)
    }
    async updateProduct(id, producto) {
        
        const filtroId = await this.path.find(p => p.id === id)
        
        const productoActualizado = this.path.map(p =>
            p.id === id
            ? {...p, 
                title: producto.title?? filtroId.title,
                description: producto.description?? filtroId.description,
                price: producto.price?? filtroId.price,
                thumbnail: producto.thumbnail?? filtroId.thumbnail,
                code: producto.code?? filtroId.price,
                stock: producto.stock?? filtroId.stock
            }
            :p
        )
        const filteredarray = this.path.filter(item => item !== filtroId)
        if(filteredarray.find(p => p.code === producto.code  )){
            console.log('El codigo ya existe')
            return
        }else if (!filtroId){
            console.log('El id no existe')
            return
        }
        else {
            const updateProductjson = JSON.stringify(productoActualizado)
            await fs.promises.writeFile('./products.json', updateProductjson)
        }
    }
    async deleteProduct(id) {

        const filtroId = await this.path.find(p => p.id === id)
        if (!filtroId) {
            console.log('El id no existe')
        }
        const eliminarProducto =JSON.stringify(this.path.filter (p => p.id !== id))
        await fs.promises.writeFile('./products.json', eliminarProducto)

        
        

    }

}







module.exports = ProductManager;