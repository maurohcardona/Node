import moongose from "mongoose";
import {
  getUser,
  createUser,
  getUserById,
  updatePassword,
} from "../../../services/user.services.js";
import { expect, use } from "chai";
import config from "../../../config/config.js";
import { createHash, isValidPassword } from "../../../utils.js";

const mongoDbTest = config.db.dbconnection;

moongose.connect(mongoDbTest, {
  dbName: "test",
});

describe("Testeo de user.services", function () {
  this.timeout(6000);

  before(async () => {
    await moongose.connection.collections.users.deleteMany({});
  });

  it("Debe crear un usuario nuevo", async () => {
    const usuarioPrueba = {
      firstname: "Prueba",
      lastname: "Prueba",
      email: "prueba@prueba.com",
      age: 999,
      password: createHash("1111"),
    };
    const result = await createUser(usuarioPrueba);

    expect(result).to.be.an("object");
  });

  it("Debe devolver el usuario buscado por el mail", async () => {
    const email = "prueba@prueba.com";

    const result = await getUser(email);

    expect(result).to.be.an("object");
    expect(result.email).deep.equal(email);
  });

  it("Debe devolver el usuario por el id de mongo", async () => {
    const email = "prueba@prueba.com";
    const user = await getUser(email);

    const result = await getUserById(user._id);

    expect(result).to.be.an("object");
  });

  it("debe modificar la contrasena hasheada", async () => {
    const email = "prueba@prueba.com";
    const newPassword = createHash("1234");

    const result = await updatePassword(email, newPassword);

    expect(result).to.be.an("object");
  });
});
