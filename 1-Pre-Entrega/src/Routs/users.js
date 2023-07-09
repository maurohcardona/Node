import  express  from "express";
import passport from "passport";
import jwt from 'jsonwebtoken';
import userModel from "../dao/models/users.js";
import { isValidPassword } from "../utils.js";
import { passportCall } from "../middlewares/user.middleware.js";



const userRouter = express.Router();

const secretKey = 'SecretCode'

userRouter.get('/', (req, res) => {
    res.render('home');
})

userRouter.get('/register', (req, res) => {  
    res.render('register');
})

userRouter.get('/current', passportCall('jwt', {failureRedirect:'/login'}),(req, res) => {
    res.render('profile', req.user);
})

userRouter.post('/register', passport.authenticate('register', {failureRedirect:'/failregister'}), async (req, res) => {
    res.redirect('/logout')
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
    try {
        const user = await userModel.findOne({ email: email });
        if (!user) {
            console.log('User not found');
            res.render('login', { message: 'User not found' });
        }
        if (!isValidPassword(user, password)) {
            return res.render('login', { message: 'Wrong password' })
        };
        delete user.password
        const { firstname, lastname, age, cart } = user
        const token = jwt.sign({ email, firstname, lastname, age, cart }, secretKey, { expiresIn: '1h' });
        res.cookie('cookieToken', token, { maxAge: 3600000, httpOnly: true });
        res.redirect('/products?limit=6'); 
    } catch (err) {
        console.log(err);
        return console.log(err.message, err);
    }
});

userRouter.get('/logout', (req, res) => {
    res.clearCookie('cookieToken');
    res.redirect('/login');
});

userRouter.get('/api/auth/github/github', passport.authenticate('github', {scope:['user: email']}), async (req, res) =>{});

userRouter.get('/api/auth/github/callback', passport.authenticate('github', {failureRedirect:'/login', session:false}), async (req, res) => { 
    const token = req.user 
    res.cookie('cookieToken', token, { maxAge: 3600000, httpOnly: true });
    res.redirect('/products?limit=6');  
})

export default userRouter;