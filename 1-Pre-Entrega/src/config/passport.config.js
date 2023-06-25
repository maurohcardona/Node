import passport from "passport";
import local from "passport-local";
import userModel from "../dao/models/users.js";
import { isValidPassword, createHash } from "../utils.js";
import GitHubStrategy from "passport-github2"
import dotenv from 'dotenv';
import cartManager from "../dao/Controllers/cartmanager.js";

dotenv.config();

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const callbackUrl = process.env.CALLBACK_URL;

const localStrategy = local.Strategy;

const initializePassport = () => {
    
    passport.use('register', new localStrategy(
        {passReqToCallback:true, usernameField: 'email'}, async (req, username, password, done) => {
            const { firstname, lastname, email, age } = req.body;
            try {
                let user =  await userModel.findOne({ email: username });
                if (user) {
                    console.log('User already registered')
                    return done(null, false, req.flash('success', 'User already registered'));
                }
                const CartManager = new cartManager();
                const cart = await CartManager.createCart(); 
                const newUser = {
                    firstname,
                    lastname,
                    email,
                    age,
                    password: createHash(password),
                    cart: cart._id
                }
                let result = await userModel.create(newUser);
                return done(null, result);
            } catch (err) {
                return done('Register faild', err);
            }
        }
    ))

    passport.use('login', new localStrategy(
        {passReqToCallback:true, usernameField: 'email'}, async(req, username, password, done) => {
        try {
            const user = await userModel.findOne({ email: username });
            if (!user) {
                console.log('User not found');
                return done(null, false, req.flash('errorlogin', 'User not found'));
            }
            if (!isValidPassword(user, password)) return done(null, false, req.flash('errorlogin', 'Invalid password'));
            delete user.password
            return done(null, user);
        } catch (err) {
            console.log(err);
            return done(err.message, err);
        }
    }))

    passport.use('github', new GitHubStrategy ({
        clientID: clientId,
        clientSecret: clientSecret,
        callbackUrl: callbackUrl
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await userModel.findOne({email: profile._json.email});
            if (!user) {
                const email =profile._json.email? profile._json.email: 'Not mail'; 
                let newUser = {
                    firstname: profile._json.name,
                    lastname: '',
                    email,
                    age:'',
                    password: ''
                }
                let result = await userModel.create(newUser);
                done(null, result);
            } else {
                done(null, user);
            }
        } catch (error) {
            done(error);
        }
    }
    ))
};



passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    let user = await userModel.findById(id);
    done(null, user);
});

export default initializePassport;