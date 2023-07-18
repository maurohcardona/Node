import userService from "../services/user.services.js";
import { isValidPassword } from "../../utils.js";
import jwt from 'jsonwebtoken';
import config from "../../config/config.js";
import { passportCall } from "../../middlewares/user.middleware.js";

const userdb = new userService();

const secretKey = config.jwt.secretkey;

export const login = async(req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userdb.getUser(email);
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
};

export const logout = (req, res) => {
    res.clearCookie('cookieToken');
    res.redirect('/login');
}

export const renderHome = (req, res) => res.render('home');

export const renderRegister = (req, res) => res.render('register');

export const current = (req, res) => {
    passportCall('jwt', { failureRedirect: '/login' })(req, res, () => {
      res.render('profile', req.user);
    });
  };

export const register = (req, res) => { 
    passport.authenticate('register', {failureRedirect:'/failregister'}), async (req, res) => {
    res.redirect('/login');
}};

export const failedRegister = (req, res) => {
    console.log('Failed strategy');
    res.send({error: 'failed'});
};

export const renderLogin = (req, res) => res.render('login');

export const githubToken = (req, res) => { 
    const token = req.user 
    res.cookie('cookieToken', token, { maxAge: 3600000, httpOnly: true });
    res.redirect('/products?limit=6');   
};



