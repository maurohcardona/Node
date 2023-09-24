import express from "express";
import {
  getCarts,
  addCartByPoductId,
  deleteAllProducts,
  getCartById,
  createCart,
  noCart,
} from "../Controllers/cart.controller.js";

const cartRouter = express.Router();

cartRouter.post("/purchase", createCart);

cartRouter.get("/cart", noCart);

cartRouter.get("/cartss/:userId", getCarts);

cartRouter.get("/carts/:cid/products/:pid", addCartByPoductId);

cartRouter.delete("/api/carts/:cid", deleteAllProducts);

cartRouter.get("/cart/:cid", getCartById);

export default cartRouter;
