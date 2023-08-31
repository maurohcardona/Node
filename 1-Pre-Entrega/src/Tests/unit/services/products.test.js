import mongoose from "mongoose";
import { expect, use } from "chai";
import config from "../../../config/config.js";
import { createHash, isValidPassword } from "../../../utils.js";
import * as productManager from "../../../services/products.services.js";
import { it } from "@faker-js/faker";

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
    expect(result.Title).to.be.an("string")
    expect(result.Description).to.be.an("string")
    expect(result.Price).to.be.an("number")
    expect(result.Stock).to.be.an("number")
    expect(result.Category).to.be.an("string")
    expect(result.Thumbnail).to.be.an("string")
  });

  it("Debe devolver un objeto y dentro de doc un array de todos los productos", async() => {
    const result = await productManager.getProducts({},1,6)
    console.log(result)

    expect(result).to.be.an("object")
    expect(result.docs).to.be.an("array")
  })

  it("Debe devolver un objeto con el producto mediante un Id", async() => {})
});
