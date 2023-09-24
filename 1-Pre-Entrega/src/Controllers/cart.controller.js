import * as cartService from "../services/cart.services.js";
import * as ticketService from "../services/ticket.services.js";
import { checkStocks, createTicket } from "../libs/cart.libs.js";
import log from "../config/logs/devlogger.js";

export const createCart = async (req, res) => {
  try {
    const newCart = req.body;
    const hasStock = await checkStocks(newCart.Cart);
    if (hasStock !== "ok") throw new Error(hasStock);
    await cartService.createCart(newCart);
    const ticket = await createTicket(newCart);
    await ticketService.createTicket(ticket);
    res.status(200).send("Cart created successfully");
  } catch (error) {
    log.error(error.message);
    return res.status(500).json("hola");
  }
};

export const noCart = (req, res) => res.render("cart");

export const getCarts = async (req, res) => {
  try {
    const userId = req.params.userId;
    const carts = await cartService.getCompleteCart(userId);

    res.status(200).send(carts);
  } catch (err) {
    log.error(err);
    res.status(500).json("Error al obtener los productos");
  }
};

export const getCartById = async (req, res) => {
  try {
    const cid = req.params.cid;
    const cart = await cartService.getCompleteCart(cid);
    const newProducts = cart.Cart.map((data) => {
      return {
        Title: data.cart.Title,
        //Description: data.cart.Description,
        Price: data.cart.Price,
        //Stock: data.cart.Stock,
        //Category: data.cart.Category,
        Thumbnail: data.cart.Thumbnail,
        id: data.cart._id,
        quantity: data.quantity,
      };
    });
    res.status(200).render("cart", { products: newProducts });
  } catch (err) {
    log.error(err.message);
    res.status(500).send("Error al traer el carrito");
  }
};

export const addCartByPoductId = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const idcart = await cartService.getCartById(cid);
    const isInCart = idcart.Cart.some(
      (product) => product.cart.toString() === pid
    );
    if (isInCart) {
      await cartService.addOnlyQuantity(cid, pid);
      await cartService.getCompleteCart(cid);
      res.status(200).redirect("/products?limit=6");
      return;
    }
    await cartService.addCartByProductId(cid, pid);
    await cartService.getCompleteCart(cid);
    res.status(200).redirect("/products?limit=6");
  } catch (err) {
    log.error(err);
    res.status(500).send('"Error al obtener los productos"');
  }
};

export const deleteAllProducts = async (req, res) => {
  try {
    const { cid } = req.params;
    await cartService.deleteProductsCart(cid);
    res.status(200).send("products removed");
  } catch (err) {
    log.error(err);
    res.status(500).json("Error al elemininar el producto");
  }
};
