import mongoose from "mongoose";
import { expect, use } from "chai";
import config from "../../../config/config.js";
import { createHash, isValidPassword } from "../../../utils.js";
import * as productManager from "../../../services/products.services.js";

const mongoDbTest = config.db.dbconnection;

mongoose.connect(mongoDbTest, {
  dbName: "test",
});

describe("Testeo de product.services", function () {
  this.timeout(6000);

  before(async () => {
    await mongoose.connection.collections.products.deleteMany({});
  });

  it("Debe crear un producto nuevo", async () => {
    const newProduct = {
      Title: "Prueba",
      Description: "Prueba",
      Price: 40,
      Stock: 10,
      Category: "Category",
      Thumbnail: "Thumbnail",
    };

    const result = await productManager.createProduct(newProduct);

    expect(result).to.be.an("object");
    expect(result.Title).to.be.an("string");
    expect(result.Description).to.be.an("string");
    expect(result.Price).to.be.an("number");
    expect(result.Stock).to.be.an("number");
    expect(result.Category).to.be.an("string");
    expect(result.Thumbnail).to.be.an("string");
  });

  it("Debe devolver un objeto y dentro de doc un array de todos los productos", async () => {
    const result = await productManager.getProducts({}, 1, 6);

    expect(result).to.be.an("object");
    expect(result.docs).to.be.an("array");
  });

  it("Debe devolver un objeto con el producto mediante un Id", async () => {
    const product = await productManager.getProductByName("Prueba");

    const result = await productManager.getProductById(product._id);

    expect(result).to.be.an("object");
    expect(result.Title).to.be.an("string");
    expect(result.Description).to.be.an("string");
    expect(result.Price).to.be.an("number");
    expect(result.Stock).to.be.an("number");
    expect(result.Category).to.be.an("string");
    expect(result.Thumbnail).to.be.an("string");
  });

  it("Debe actualizar un producto y devolver un objeto con el producto nuevo", async () => {
    const product = await productManager.getProductByName("Prueba");
    const modifyProduct = {
      Price: 100,
    };

    const result = await productManager.updateProduct(
      product._id,
      modifyProduct
    );

    expect(result).to.be.an("object");
    expect(result.Title).to.be.an("string");
    expect(result.Description).to.be.an("string");
    expect(result.Price).to.be.an("number");
    expect(result.Stock).to.be.an("number");
    expect(result.Category).to.be.an("string");
    expect(result.Thumbnail).to.be.an("string");
  });

  it("Debe actualizar la cantidad en uno en el estock del producto dando un valor de 9", async () => {
    const product = await productManager.getProductByName("Prueba");

    await productManager.updateStock(product._id, 1);
    const result = await productManager.getProductByName("Prueba");

    expect(result).to.be.an("object");
    expect(result.Stock).equal(9);
  });

  it("Debe eliminar el producto", async () => {
    const product = await productManager.getProductByName("Prueba");

    const result = await productManager.deleteProduct(product._id);

    expect(result).to.be.an("object");
    expect(result._id).deep.equal(product._id);
  });
});
