import jwt from 'jsonwebtoken';
import config from "../config/config.js";

const secretKey = config.jwt.secretkey;

export const generateToken = (payload) => {
    //const token = (info) => {
   // }
        const result = jwt.sign( payload , secretKey, { expiresIn: '1h' });
        //res.cookie('cookieToken', token, { maxAge: 3600000, httpOnly: true });
        return result;
};