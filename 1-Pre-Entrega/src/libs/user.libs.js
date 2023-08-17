import jwt from "jsonwebtoken";
import config from "../config/config.js";
import transporter from "../config/mails.config.js";
import log from "../config/logs/devlogger.js";

const secretKey = config.jwt.secretkey;

export const generateToken = (payload) => {
  const result = jwt.sign(
    {
      id: payload.id,
      email: payload.email,
      firstname: payload.firstname,
      lastname: payload.lastname,
      age: payload.age,
      rol: payload.rol,
    },
    secretKey,
    { expiresIn: "1h" }
  );
  return result;
};

export const generarTokenReset = (correo) =>
  jwt.sing({ correo }, secretKey, { expiresIn: "1h" });

export const validateToken = (token) =>
  jwt.verify(token, secretKey, (err) => (err ? false : true));

export const sendRecoveryPassword = (email, token) => {
  const URL =
    config.url.baseUrl +
    config.url.recoveryPassUrl +
    `?token=${token}&correo=${email}`;

  const button = `<a class='hola' href=${URL} target='blank'>
                          <button>Recuperar contrasenaaa</button>
                  </a>`;

  const mailOption = {
    from: "info@bentica.com.ar",
    to: email,
    subject: "Recuperacion de contrasena",
    html: `
        <h1>Por favor haga click en el siguiente boton para reestablecer su contrasena </h1>
        <hr>
        <a class='hola' href=${URL} target='blank'>
                          <button>Recuperar contrasena</button>
                  </a>
        `,
  };

  transporter.sendMail(mailOption, (err, info) => {
    if (err) return log.error("Error al enviar el mail");

    log.info("email enviado correctamente");
  });
};

export const decodeToken = (token) => {
  return jwt.decode(token);
};
