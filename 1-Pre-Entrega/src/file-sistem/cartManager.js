//const fs = require('fs');
import fs from 'fs';
//const ProductManager = require('./productmanager')
import ProductManager from './productmanager.js';
const producto = new ProductManager()



class CartManager {

    constructor() {
        this.path = JSON.parse(fs.readFileSync('./carts.json', 'utf-8'))
    }

    async addCart(){
        const id = this.path.length + 1;
        const newCart = {
            id,
            cart: []
        }
        this.path.push(newCart);
        const carts = JSON.stringify(this.path);
        await fs.promises.writeFile('./carts.json', carts)
    }

    async addProductToCart(cid, pid){

        const index = this.path.findIndex(elemento => elemento.id === cid);
        const filtroId = producto.path.find(p => p.id === pid)
        const productInCart = this.path[index].cart?.some(producto => producto.id === pid)
        const path = this.path[index].cart
        const index2 = path.findIndex(elemento => elemento.id === pid);

        
        if(!productInCart){
            this.path[index].cart.push( {
                id: filtroId?.id,
                quantity: 1
            })
        }else {
           path[index2].quantity +=1                
        }
        const cart = JSON.stringify(this.path)
        await fs.promises.writeFile('./carts.json', cart)
    };
}


export default CartManager