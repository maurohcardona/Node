import * as productService from '../services/products.services.js';
import * as userService from '../services/user.services.js';


export const checkStocks = async (cart) => {
    const errorMessages = [];
    const promises = cart.map(async producto => {
      const idProduct = producto.cart;
      const quantity = producto.quantity;
      const item = await productService.getProductById(idProduct);
      const stock = item.Stock;
      if (producto.quantity >= stock) {
          errorMessages.push(`Stock insuficiente en el producto ${item.Title}`);
      } else {
        await productService.updateStock(idProduct, quantity)
      }
    });
  
    try {
        await Promise.all(promises);
        if (errorMessages.length > 0) {
            return errorMessages;
          } else {
            return 'ok';
          }
    } catch (error) {
        errorMessages.push(error.message);
        return errorMessages;
    }
  };
  
  export const createTicket = async(cart) => {
    
    let totalPrice = 0;
    
    
    const promises = cart.Cart.map(async producto => {
      const idProduct = producto.cart;
      const quantity = producto.quantity;
      const item = await productService.getProductById(idProduct);
      const price = item.Price
      const productTotalPrice = price * quantity
      totalPrice += productTotalPrice;
  });
  try {
    await Promise.all(promises);
    const user = await userService.getUserById(cart.user);
    const email = user.email;
    const randomCode = Math.floor(Math.random() * 100000);

    const ticket = {
      code: randomCode,
      amount: totalPrice,
      purchaser: email
    }
    return ticket;
  } catch (error) {
    return error.message;
  }

  
}
  
  
  
  