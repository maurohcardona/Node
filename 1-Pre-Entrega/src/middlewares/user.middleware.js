import passport from "passport";
import * as productServices from "../services/products.services.js";
import log from "../config/logs/devlogger.js";

export const hasToken = (strategy) => {
  return async (req, res, next) => {
    try {
      passport.authenticate(strategy, function (err, user, info) {
        if (!user) {
          return res.status(404).json("Usuario no autenticado");
        }
        req.user = user;
        return next();
      })(req, res, next);
    } catch (error) {
      log.error(error.message);
      res.status(400).send(error.message);
    }
  };
};

export const isAdmin = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, function (err, user, info) {
      if (user.rol === "admin") {
        next();
      } else {
        return res.status(403).send({ message: "user in not admin" });
      }
    })(req, res, next);
  };
};

export const isPremium = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, function (err, user, info) {
      if (user.rol === "premium" || user.rol === "admin") {
        next();
      } else {
        return res.status(403).send({ message: "user in not Premium" });
      }
    })(req, res, next);
  };
};

export const isOwnerProduct = async (req, res, next) => {
  const { idProduct } = req.params;

  if (req.user.rol === "admin") return next();

  try {
    const product = await productServices.getProductById(idProduct);

    if (product.owner === req.user.email) {
      return next();
    } else {
      res.status(403).send("User not allowed");
    }
  } catch (error) {
    log.error("Error de autenticacion", error);
    res.status(403).send("Error de autenticacion");
  }
};
