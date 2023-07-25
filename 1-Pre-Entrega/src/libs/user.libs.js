import jwt from 'jsonwebtoken';
import config from "../config/config.js";

const secretKey = config.jwt.secretkey;

export const generateToken = (payload) => {
        const result = jwt.sign( {
                id: payload.id,
                email: payload.email,
                firstname: payload.firstname,
                lastname: payload.lastname,     
                age: payload.age,
                rol: payload.rol
                }, 
                secretKey,
                { expiresIn: '1h' });
        return result;
};