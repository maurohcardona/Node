import express from "express";
import {
  hasToken,
  isAdmin,
  isPremium,
  isOwnerProduct,
} from "../middlewares/user.middleware.js";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  hola,
  getProductById,
  getAllProducts,
} from "../Controllers/product.controller.js";

const productRouter = express.Router();

productRouter.get("/", hasToken("jwt"), getProducts);

productRouter.get("/admin", hasToken("jwt"), isAdmin("jwt"), getAllProducts);

productRouter.get("/:idProduct", hasToken("jwt"), getProductById);

productRouter.post("/", hasToken("jwt"), isPremium("jwt"), createProduct);

productRouter.put(
  "/:idProduct",
  hasToken("jwt"),
  isOwnerProduct,
  updateProduct
);

productRouter.delete(
  "/:idProduct",
  hasToken("jwt"),
  isOwnerProduct,
  deleteProduct
);

productRouter.put("/", hola);

export default productRouter;
