import  express  from "express";
import passport from "passport";
import * as usermanager from "../dao/Controllers/usermanager.js";

const userRouter = express.Router();

userRouter.get('/', usermanager.renderHome);

userRouter.get('/register', usermanager.renderRegister);

userRouter.get('/current', usermanager.current);

userRouter.post('/register',passport.authenticate('register', {failureRedirect:'/failregister'}), usermanager.register);

userRouter.get('/failregister', usermanager.failedRegister);

userRouter.get('/login', usermanager.renderLogin);

userRouter.post('/login', usermanager.login);

userRouter.get('/logout', usermanager.logout);

userRouter.get('/api/auth/github/github', passport.authenticate('github', {scope:['user: email']}));

userRouter.get('/api/auth/github/callback', passport.authenticate('github', {failureRedirect:'/login', session:false}), usermanager.githubToken);

export default userRouter;