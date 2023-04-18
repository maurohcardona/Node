const fs = require('fs');

isRequired = function () {
    throw new Error( 'Missing parameter' );
};

class ProductManager {

    constructor() {

        this.path = JSON.parse(fs.readFileSync('./products.json', 'utf-8'))
    }
     
    
     async addproducts(title = isRequired(), description = isRequired(), price = isRequired(), thumbnail = isRequired(), code = isRequired(), stock = isRequired()) {

        
       
        const id = this.path.length + 1
        
        const producto = {
        id,
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: code,
        stock: stock
        }
        

        if((stock || title || code || description || price || thumbnail || stock) === undefined) {
            console.log('Falta completar algun campo')
        }
        else if(this.path.find(p => p.code === code)){
            console.log('El codigo ya existe')
       }
        else  {
            this.path.push(producto)
            const productos = JSON.stringify(this.path)
            await fs.promises.writeFile('./productos.json', productos)
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

