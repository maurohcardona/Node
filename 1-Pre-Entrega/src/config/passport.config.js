import passport from "passport";
import local from "passport-local";
import userModel from "../dao/models/users.js";
import { isValidPassword, createHash } from "../utils.js";

const localStrategy = local.Strategy;

const initializePassport = () => {
    
    passport.use('register', new localStrategy(
        {passReqToCallback:true, usernameField: 'email'}, async (req, username, password, done) => {
            const { firstname, lastname, email, age } = req.body;
            try {
                let user =  await userModel.findOne({ email: username });
                if (user) {
                    console.log('User already registered')
                    return done(null, false);
                } 
                const newUser = {
                    firstname,
                    lastname,
                    email,
                    age,
                    password: createHash(password)
                }
                let result = await userModel.create(newUser);
                return done(null, result);
            } catch (err) {
                return done('Register faild', err);
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