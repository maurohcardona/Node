import express from "express";
import passport from "passport";
import * as usermanager from "../Controllers/user.controller.js";
import { hasToken } from "../middlewares/user.middleware.js";

const userRouter = express.Router();

userRouter.get("/", usermanager.renderHome);

userRouter.get("/register", usermanager.renderRegister);

userRouter.get("/current", hasToken("jwt"), usermanager.current);

userRouter.post("/register", usermanager.registerUser);

userRouter.get("/failregister", usermanager.failedRegister);

userRouter.get("/login", usermanager.renderLogin);

userRouter.post("/login", usermanager.login);

userRouter.get("/logout", usermanager.logout);

userRouter.get("/recoverpass", usermanager.recoverpass);

userRouter.get(
  "/api/auth/github/github",
  passport.authenticate("github", { scope: ["user: email"] })
);

userRouter.get(
  "/api/auth/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/login",
    session: false,
  }),
  usermanager.githubToken
);

userRouter.post("/passwordrecover", usermanager.passwordRecovery);

userRouter.get("/user/recoverypassword", usermanager.recoverPassword);

userRouter.post(
  "/user/resetpassword",
  hasToken("jwt"),
  usermanager.resetPassword
);

export default userRouter;
