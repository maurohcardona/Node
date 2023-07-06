import  express  from "express";
import passport from "passport";

const userRouter = express.Router();

userRouter.get('/', (req, res) => {
    res.render('home');
})

userRouter.get('/register', (req, res) => {  
    res.render('register');
})

userRouter.get('/current', isAuthenticated,(req, res) => {
    res.render('profile', req.session.user);
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

userRouter.post('/login', passport.authenticate('login', {failureRedirect:'/login'}), async (req, res) => {
    if (!req.user) return res.status(400).send({status:'error', error:'invalid credentials'});
    req.session.user = {
        firstname: req.user.firstname,
        lastname: req.user.lastname,
        age: req.user.age,
        email: req.user.email,
        cart: req.session.cart
        }
    if (req.user.email === 'adminCoder@coder.com'){
        req.session.admin = true
        res.redirect('/products?limit=6');
    } else {
        req.session.admin = false
        res.redirect('/products?limit=6');  
    } 
});

userRouter.get('/faillogin', (req, res) =>{
    res.send({error:"failed login"})
})



userRouter.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

userRouter.get('/api/sessions/github', passport.authenticate('github', {scope:['user: email']}), async (req, res) =>{});

userRouter.get('/api/sessions/githubcallback', passport.authenticate('github', {failureRedirect:'/login'}), async (req, res) => {
    req.session.user = req.user;    
    res.redirect('/products?limit=6');  
})

export function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};


export default userRouter;