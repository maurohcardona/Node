import  express  from "express";
import userModel from "../models/users.js";
import { createHash }  from "../../utils.js";
import { isValidPassword } from "../../utils.js";

const userRouter = express.Router();


userRouter.get('/register', (req, res) => {
    res.render('register');
})

userRouter.post('/register', async (req,res)=>{
    const { firstname, lastname, email, age, password } = req.body;
    
    const userEx = await userModel.findOne({email});
    if( userEx ) {
        console.error('Error, el usuario ya esta registrado');
        res.redirect('/login');
    }
    try {
        const user = new userModel({ firstname, lastname, email, age, password:createHash(password) });
        await user.save();
        res.redirect('/login');
    } catch (error) {   
        console.error('Error al registrar el usuario:', error);
        res.redirect('/register');
    }
})

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