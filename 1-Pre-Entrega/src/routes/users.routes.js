import express from "express";
import passport from "passport";
import * as usermanager from "../Controllers/user.controller.js";
import { hasToken } from "../middlewares/user.middleware.js";
import { uploader } from "../utils.js";

const userRouter = express.Router();

userRouter.get("/api/users", usermanager.allUsers);

userRouter.put("/api/users", usermanager.deleteUsers);

userRouter.get("/current", hasToken("jwt"), usermanager.current);

userRouter.post("/register", usermanager.registerUser);

userRouter.get("/failregister", usermanager.failedRegister);

userRouter.post("/login", usermanager.login);

userRouter.get("/logout", hasToken("jwt"), usermanager.logout);

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

userRouter.post(
  "/api/users/:uid/documents/:direct/:ident",
  uploader.single("file"),
  usermanager.userDocuments
);

userRouter.get("/api/users/premium/:uid", usermanager.userToPremium);

export default userRouter;
