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
  getProductById,
} from "../Controllers/product.controller.js";

const productRouter = express.Router();

productRouter.get("/", hasToken("jwt"), getProducts);

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

productRouter.get("/mockingproducts", createMockProduct);

export default productRouter;
