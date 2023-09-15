import * as productService from "../services/products.services.js";
import { generateProducts } from "../utils.js";
import { errorProduct } from "../services/errors/customerror.js";
import log from "../config/logs/devlogger.js";
import Eerrors from "../services/errors/enums.js";
import { getCartByUserId } from "../services/cart.services.js";

export const getProducts = async (req, res) => {
  try {
    //const userId = req.user.id;
    //const cart = await getCartByUserId(userId);
    const { limit, category, sort } = req.query;
    const pages = req.query.page;
    const PAGE = pages ? pages : 1;
    const filter = category ? { Category: category } : {};
    const SORT = sort ? { Price: sort } : { Title: 1 };
    //const cid = cart ? cart._id : "";
    const products = await productService.getProducts(
      filter,
      PAGE,
      limit,
      SORT
    );
    products.prevLink = products.hasPrevPage
      ? `http://localhost:8080/products?limit=10&page=${products.prevPage}`
      : "";
    products.nextLink = products.hasNextPage
      ? `http://localhost:8080/products?limit=10&page=${products.nextPage}`
      : "";
    const newProducts = products.docs.map((data) => {
      return {
        Title: data.Title,
        Description: data.Description,
        Price: data.Price,
        Stock: data.Stock,
        Category: data.Category,
        Thumbnail: data.Thumbnail,
        id: data._id,
      };
    });
    const { prevLink, nextLink, totalDocs, page } = products;
    //const emailUser = req.user.id;
    res.status(200).json({
      products: newProducts,
      page,
      totalDocs,
      prevLink,
      nextLink,
      //cid,
      //emailUser,
    });
  } catch (err) {
    log.error(err.message);
    res.status(500).send("Error al obtener los productos");
  }
};

export const createProduct = async (req, res) => {
  try {
    const { Title, Description, Price, Stock, Category, Thumbnail } = req.body;
    const ownerEmail = req.user.rol === "admin" ? "admin" : req.user.email;
    if (!Stock || !Category || !Thumbnail || !Description || !Price || !Stock) {
      throw new errorProduct(
        "Falta completar datos del producto",
        Eerrors.INVALID_PARAM
      );
    } else {
      const newProduct = {
        Title,
        Description,
        Price,
        Stock,
        Thumbnail,
        Category,
        owner: ownerEmail,
      };
      await productService.createProduct(newProduct);
      res.status(200).send(newProduct);
    }
  } catch (err) {
    log.error(err);
    res.status(500).send(
      `Error: ${err.name}
            Mensaje: ${err.message} 
            Codigo: ${err.code}`
    );
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { idProduct } = req.params;
    const updateproduct = req.body;
    const update = await productService.updateProduct(idProduct, updateproduct);
    res.status(200).send(update);
  } catch (error) {
    log.error(error);
    res.status(500).send("Error al actualiza el producto");
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { idProduct } = req.params;
    await productService.deleteProduct(idProduct);
    res.status(200).send("Product deleted");
  } catch (error) {
    log.error(error);
    res.status(500).send("No se pudo eliminar el producto");
  }
};

export const createMockProduct = async (req, res) => {
  let users = [];
  for (let i = 0; i < 100; i++) {
    users.push(generateProducts());
  }
  res.status(200).send(users);
};
