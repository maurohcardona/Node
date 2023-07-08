import passport from 'passport';
import Jwt from 'jsonwebtoken';


export const passportCall =  (strategy) => {
    return async(req, res, next) => {
        passport.authenticate(strategy, function(err, user, info){
            if (err) return next(err)
            if (!user) {
                return res.status(401).send({error:info.messages?info.messages: info.toString()})
            }
            req.user = user
            next();
        })(req, res, next)
    }
}

export const credentials = (app) => {
    return ((req, res, next) => {
        if (req.cookies && req.cookies.cookieToken) {
            const cookieValue = req.cookies.cookieToken;
            Jwt.verify(cookieValue, 'SecretCode', (error, credentials) => {
                app.locals.cookieValue = credentials;   
            })
        } else {
            delete app.locals.cookieValue;
        }
        next();  
    })
} 


