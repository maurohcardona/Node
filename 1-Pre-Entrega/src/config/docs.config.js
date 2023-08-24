import swaggerJSDoc from "swagger-jsdoc";
import { __dirname } from "../utils.js";

const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Documentacion en swagger",
      description:
        " Documenacion dentro de swagger de la aplicacion de Bentica",
    },
  },
  apis: [`${__dirname}/docs/**/*.yml`],
};

const specs = swaggerJSDoc(swaggerOptions);

export default specs;
