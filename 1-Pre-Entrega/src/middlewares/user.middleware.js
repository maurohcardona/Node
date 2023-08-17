import passport from "passport";
import * as productServices from "../services/products.services.js";

export const hasToken = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, function (err, user, info) {
      if (!user) {
        return res.redirect("/login");
      }
      req.user = user;
      return next();
    })(req, res, next);
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
