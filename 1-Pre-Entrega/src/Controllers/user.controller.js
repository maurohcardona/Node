import * as userService from "../services/user.services.js";
import { isValidPassword, createHash } from "../utils.js";
import { hasToken } from "../middlewares/user.middleware.js";
import { generateToken } from "../libs/user.libs.js";
import log from "../config/logs/devlogger.js";

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      req.logger.error("Falta completar datos");
      return res.render("login", { message: "Faltan datos" });
    }
    const user = await userService.getUser(email);
    if (!user) {
      req.logger.error("Usuario no encontrado");
      return res.render("login", { message: "User not found" });
    }
    if (!isValidPassword(user, password)) {
      req.logger.error("Password incorrecto");
      return res.render("login", { message: "Wrong password" });
    }
    delete user.password;
    const token = generateToken(user);
    res.cookie("cookieToken", token, { maxAge: 3600000, httpOnly: true });
    res.redirect("/products?limit=6");
  } catch (err) {
    log.error(err.message, err);
    res.status(500).json({ error: err.message });
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
    res.status(200).render("login");
  } catch (err) {
    log.error("Register faild", err);
    res.status(500).json({ error: err.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie("cookieToken");
  res.redirect("/login");
};

export const renderHome = (req, res) => res.render("home");

export const renderRegister = (req, res) => res.render("register");

export const current = (req, res) => {
  hasToken("jwt", { failureRedirect: "/login" })(req, res, () => {
    res.render("profile", req.user);
  });
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
  res.cookie("cookieToken", token, { maxAge: 3600000, httpOnly: true });
  res.redirect("/products?limit=6");
};
