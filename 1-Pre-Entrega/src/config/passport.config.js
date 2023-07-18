import passport from "passport";
import local from "passport-local";
import userService from "../dao/services/user.services.js";
import { createHash } from "../utils.js";
import GitHubStrategy from "passport-github2"
import "dotenv/config";
import config from "./config.js";
import cartService from "../dao/services/cart.services.js";
import jwtp from 'passport-jwt';
import jwt from 'jsonwebtoken';

const userDB = new userService();
const cartDB = new cartService();

const clientId = config.passport.clientId;
const clientSecret = config.passport.clientSecret;
const callbackUrl = config.passport.callbackUrl;

const JWTStrategy = jwtp.Strategy;
const ExtractJWT = jwtp.ExtractJwt;

const localStrategy = local.Strategy;

const cookieExtractor = req => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['cookieToken'];
    }
    return token;
}

const initializePassport = () => {
    
    passport.use('register', new localStrategy(
        {passReqToCallback:true, usernameField: 'email'}, async (req, username, password, done) => {
            const { firstname, lastname, email, age } = req.body;
            try {
                let user =  await userDB.getUser(username);
                if (user) {
                    console.log('User already registered')
                    return done(null, false, req.flash('success', 'User already registered'));
                }
                const cart = await cartDB.createCart(); 
                const newUser = {
                    firstname,
                    lastname,
                    email,
                    age,
                    password: createHash(password),
                    cart: cart._id
                }
                let result = await userDB.createUser(newUser);
                return done(null, result);
            } catch (err) {
                return done('Register faild', err);
            }
        }
    ))

    passport.use('github', new GitHubStrategy.Strategy ({
        clientID: clientId,
        clientSecret: clientSecret,
        callbackUrl: callbackUrl
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await userDB.getUser(profile._json.email);
            if (!user) {
                const cart = await cartDB.createCart();
                const email =profile._json.email? profile._json.email: 'Not mail'; 
                let newUser = {
                    firstname: profile._json.name,
                    lastname: '',
                    email,
                    age:'',
                    password: '',
                    cart: cart._id
                }   
                await userDB.createUser(newUser);
                const { firstname, lastname } = newUser;
                const token = jwt.sign({firstname, lastname, email, cart, age}, 'SecretCode');
                done(null, token);
            } else {
                const { firstname, lastname, email, cart, age } = user;
                const token = jwt.sign({firstname, lastname, email, cart, age}, 'SecretCode');
                done(null, token);
            }
        } catch (error) {
            done(error);
        }
    }))

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: 'SecretCode',
    }, async (jwt_payload, done) => {
        try{
            return done(null, jwt_payload);
        } catch (error) {
            return done(error);
        }
    }
    ))
};



passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    let user = userDB.getUserById(id);
    done(null, user);
});

export default initializePassport;