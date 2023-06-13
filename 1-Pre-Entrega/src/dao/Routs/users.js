import  express  from "express";
import userModel from "../models/users.js";

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
        const user = new userModel({ firstname, lastname, email, age, password });
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

    try {
        const user = await userModel.findOne({ email, password });
        if (!user) {
            res.redirect('/login');
            console.log('el usuario no existe')
        
        } else if (email === 'adminCoder@coder.com'){
            req.session.user = user;
            req.session.admin = true
            console.log(req.session.admin)
            res.redirect('/products?limit=2');
        } else {
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