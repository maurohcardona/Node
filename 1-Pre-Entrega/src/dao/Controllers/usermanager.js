import userModel from "../models/users.js";
import { isValidPassword } from "../../utils.js";
import jwt from 'jsonwebtoken';
import config from "../../config/config.js";

const secretKey = config.jwt.secretkey;

export const login = async(req, res) => {
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
};

export const logout = (req, res) => {
    res.clearCookie('cookieToken');
    res.redirect('/login');
}
