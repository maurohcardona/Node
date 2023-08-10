import * as productService from "../services/products.services.js";
import { generateProducts } from "../utils.js";
import { errorProduct } from "../services/errors/customerror.js";
import Eerrors from "../services/errors/enums.js";

export const getProducts = async (req, res) => {
  try {
    const { limit, category, sort } = req.query;
    const pages = req.query.page;
    const PAGE = pages ? pages : 1;
    const filter = category ? { Category: category } : {};
    const SORT = sort ? { Price: sort } : { Title: 1 };
    const cid = req.user.cart;
    const products = await productService.getProducts(
      filter,
      PAGE,
      limit,
      SORT
    );
    products.prevLink = products.hasPrevPage
      ? `http://localhost:8080/products?limit=6&page=${products.prevPage}`
      : "";
    products.nextLink = products.hasNextPage
      ? `http://localhost:8080/products?limit=6&page=${products.nextPage}`
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
        cid,
      };
    });
    const { prevLink, nextLink, totalDocs, page } = products;
    res.status(200).render("realTimeProducts", {
      products: newProducts,
      page,
      totalDocs,
      prevLink,
      nextLink,
    });
  } catch (err) {
    req.logger.error("Error al obtener los productos", err);
  }
};

export const createProduct = async (req, res) => {
  try {
    const { Title, Description, Price, Stock, Category, Thumbnail } = req.body;
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
      };
      await productService.createProduct(newProduct);
      res.status(200).send(newProduct);
    }
  } catch (err) {
    req.logger.error(err);
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
    const updateProduct = req.body;
    const update = await productService.updateProduct(idProduct, updateProduct);
    res.status(200).send(update);
  } catch (error) {
    req.logger.error(error);
  }
};

export const deleteProduct = async (req, res) => {
  const { idProduct } = req.params;
  await productService.deleteProduct(idProduct);
  res.status(200).send("Product deleted");
};

export const createMockProduct = async (req, res) => {
  let users = [];
  for (let i = 0; i < 100; i++) {
    users.push(generateProducts());
  }
  res.status(200).send(users);
};
