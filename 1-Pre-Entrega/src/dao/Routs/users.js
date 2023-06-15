import  express  from "express";
import userModel from "../models/users.js";
import { createHash }  from "../../utils.js";
import { isValidPassword } from "../../utils.js";
import passport from "passport";

const userRouter = express.Router();


userRouter.get('/register', (req, res) => {
    res.render('register');
})

userRouter.post('/register', passport.authenticate('register', {failureRedirect:'/failregister'}), async (req, res) => {
    res.redirect('/login')
})

userRouter.get('/failregister', async (req, res) => {
    console.log('Failed strategy');
    res.send({error: 'failed'});
});


userRouter.get('/login', async (req, res) => {
    res.render('login')
})

userRouter.post('/login', passport.authenticate('login', {failureRedirect:'/faillogin'}), async (req, res) => {
    if (!req.user) return res.status(400).send({status:'error', error:'invalid credentials'});
    req.session.user = {
        firstname: req.user.firstname,
        lastname: req.user.lastname,
        age: req.user.age,
        email: req.user.email
        }
    if (req.user.email === 'adminCoder@coder.com'){
        req.session.admin = true
        res.redirect('/products?limit=2');
    } else {
        req.session.admin = false
        res.redirect('/products?limit=2');  
    } 
});

userRouter.get('/faillogin', (req, res) =>{
    res.send({error:"failed login"})
})



userRouter.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});


export default userRouter;