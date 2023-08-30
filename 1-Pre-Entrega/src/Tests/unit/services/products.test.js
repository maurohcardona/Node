import mongoose from "mongoose";
import { expect, use } from "chai";
import config from "../../../config/config.js";
import { createHash, isValidPassword } from "../../../utils.js";
import * as productManager from "../../../services/products.services.js";

const mongoDbTest = config.db.dbconnection;

moongose.connect(mongoDbTest, {
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
  });
});
