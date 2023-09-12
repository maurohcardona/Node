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
  createMockProduct,
} from "../Controllers/product.controller.js";

const productRouter = express.Router();

productRouter.get("/", getProducts);

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

productRouter.get("/mockingproducts", createMockProduct);

export default productRouter;
