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

userRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            res.redirect('/login');
            console.log('el usuario no existe')
        
        } else if (email === 'adminCoder@coder.com'){
            if (!isValidPassword(user, password))
                return res.status(403).send({status: 'error', error:'Incorrect password'})
            delete user.password
            req.session.user = user;
            req.session.admin = true
            res.redirect('/products?limit=2');
        } else {
            if (!isValidPassword(user, password))
                return res.status(403).send({status: 'error', error:'Incorrect password'})
            delete user.password
            req.session.user = user;
            req.session.admin = false;
            res.redirect('/products?limit=2');
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.redirect('/login');
    }
});

userRouter.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});


export default userRouter;