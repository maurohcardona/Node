import  express  from "express";
import passport from "passport";
import { login, logout } from "../dao/Controllers/usermanager.js";
import { passportCall } from "../middlewares/user.middleware.js";



const userRouter = express.Router();

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


userRouter.post('/login', login);

userRouter.get('/logout', logout);

userRouter.get('/api/auth/github/github', passport.authenticate('github', {scope:['user: email']}), async (req, res) =>{});

userRouter.get('/api/auth/github/callback', passport.authenticate('github', {failureRedirect:'/login', session:false}), async (req, res) => { 
    const token = req.user 
    res.cookie('cookieToken', token, { maxAge: 3600000, httpOnly: true });
    res.redirect('/products?limit=6');  
})

export default userRouter;