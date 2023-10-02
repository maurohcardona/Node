import * as userService from "../services/user.services.js";
import { isValidPassword, createHash } from "../utils.js";
import { getCartByUserId } from "../services/cart.services.js";

import {
  generateToken,
  sendRecoveryPassword,
  validateToken,
  sendUserDeleted,
} from "../libs/user.libs.js";
import log from "../config/logs/devlogger.js";

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      req.logger.error("Falta completar datos");
      return res.status(401).json("Faltan datos");
    }
    const userComplete = await userService.getUser(email);

    if (!userComplete) {
      req.logger.error("Usuario no encontrado");
      return res.status(401).json("Usuario o Password invalidos");
    }
    if (!isValidPassword(userComplete, password)) {
      req.logger.error("Password incorrecto");
      return res.status(401).json("Usuario o contrasena invalidos");
    }
    if (userComplete.status === false) {
      req.logger.error("Usuario suspendido");
      return res.status(401).json("Usuario suspendido");
    }
    const user = {
      id: userComplete._id,
      email: userComplete.email,
      rol: userComplete.rol,
    };
    const token = generateToken(user);
    res.cookie("cookieToken", token, { maxAge: 3600000 });
    res.status(200).send(user);
  } catch (err) {
    log.error(err.message);
    res.status(400).send(err.message);
  }
};

export const registerUser = async (req, res) => {
  const { firstname, lastname, email, age, password } = req.body;
  try {
    if (!firstname || !lastname || !email || !age || !password) {
      req.logger.error("Faltan datos");
      return res.render("register", { message: "Faltan datos" });
    }
    let user = await userService.getUser(email);
    if (user) {
      req.logger.info("User registered");
      return res.render("register", { message: "User registered" });
    }
    const newUser = {
      firstname,
      lastname,
      email,
      age,
      password: createHash(password),
    };
    await userService.createUser(newUser);
    res.status(200).send("Usuario creado");
  } catch (err) {
    log.error(err.message);
    res.status(500).send('"Register faild"');
  }
};

export const recoverpass = (req, res) => res.render("recoverpass");

export const logout = async (req, res) => {
  await userService.lastLogout(req.user.id);
  res.clearCookie("cookieToken");
  res.status(200).send("Usuario deslogueado exitosamente");
};

export const renderHome = (req, res) => res.render("home");

export const renderRegister = (req, res) => res.render("register");

export const current = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await getCartByUserId(userId);
    const cid = cart ? cart._id : "";
    const profile = await userService.getUser(req.user.email);
    delete profile.password;
    res.status(200).json({ profile, cid });
  } catch (error) {}
};

export const register = (req, res) => {
  res.redirect("/login");
};

export const failedRegister = (req, res) => {
  req.logger.error("Failed strategy");
  res.send({ error: "failed" });
};

export const renderLogin = (req, res) => res.render("login");

export const githubToken = (req, res) => {
  const token = req.user;
  res.cookie("cookieToken", token, { maxAge: 3600000 });
  res.redirect("/products?limit=6");
};

export const passwordRecovery = async (req, res) => {
  const { correo } = req.body;

  if (!correo)
    return res
      .status(500)
      .render("recoverpass", { message: "Debe ingresar un correo" });

  try {
    const user = await userService.getUser(correo);

    if (!user)
      return res
        .status(404)
        .render("recoverpass", { message: "Usuario inexistente" });

    const token = generateToken(correo);

    sendRecoveryPassword(correo, token);

    res.status(200).render("sentmail");
  } catch (e) {
    log.error("Error: ", e);
    res.status(500).send("Error al enviar el mail");
  }
};

export const recoverPassword = (req, res) => {
  const { token } = req.query;
  const { correo } = req.query;

  try {
    const checkToken = validateToken(token);

    if (!checkToken) {
      log.error("Invalid Token");
      return res.status(401).send("Acceso denegado");
    }
    res.cookie("cookieToken", token, { maxAge: 3600000, httpOnly: true });
    res.status(200).render("passrecover", { token, correo });
  } catch (error) {
    log.error(error);
    res.status(500).send("Error interno");
  }
};

export const resetPassword = async (req, res) => {
  const { password } = req.body;
  const { correo } = req.query;

  if (!password) {
    return res.render("passrecover", {
      correo,
      message: "Debe ingresar una contrasena",
    });
  }

  try {
    const hashPassword = createHash(password);
    await userService.updatePassword(correo, hashPassword);
    res.clearCookie("cookieToken");
    res.status(200).render("resetpass");
  } catch (error) {
    log.error(error);
    res.status(500).send("Error al cambiar la contrasena");
  }
};

export const userDocuments = async (req, res) => {
  const { uid, direct, ident } = req.params;
  try {
    if (!req.file) {
      log.error("No se pudo cargar la imagen");
      return res.status(400).send({ error: "No se pudo cargar el documento" });
    }
    console.log("uid: " + uid);
    console.log("direct: " + direct);
    console.log("ident: " + ident);

    const newDocument = {
      name: ident,
      reference: req.file.path,
      path: `http://localhost:8080/uploads/${direct}/${req.file.filename}`,
    };
    await userService.uploadDocument(uid, newDocument);
    res.status(200).send("Document upload sussesfully");
  } catch (error) {
    console.log(error);
  }
};

export const userToPremium = async (req, res) => {
  const { uid } = req.params;

  try {
    const user = await userService.getUserById(uid);
    const nombresAB = [
      "Identificacion",
      "Comprobante de domicilio",
      "Comprobante de cuenta",
    ];
    const todosPresentes = nombresAB.every((nombre) =>
      user.documents.some((objeto) => objeto.name === nombre)
    );
    if (todosPresentes) {
      await userService.toPremium(uid);
      return res
        .status(200)
        .send("Toda la documentacion fue cargado con exito");
    } else {
      return res.status(400).send("No ha cargado toda la documentacion");
    }
  } catch (error) {
    log.error("error");
    return res.status(500).send("Error al subir la documentacion");
  }
};

export const allUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    return res.status(200).send({ users });
  } catch (error) {
    log.error(error);
    return res.status(500).send("No se pudieron obtener los usuarios");
  }
};

export const deleteUsers = async (req, res) => {
  try {
    const users = await userService.updatedUsers();
    await userService.deleteUsers();
    sendUserDeleted(users);
    return res.status(200).send({ users });
  } catch (error) {
    return res.status(500).send("No se pudieron eliminar los usuarios");
  }
};
