import passport from 'passport';
import Jwt from 'jsonwebtoken';


export const hasToken =  (strategy) => {
    return async(req, res, next) => {
        passport.authenticate(strategy, function(err, user, info){
            if (!user) {
                res.redirect('/login');    
            }
            req.user = user
            next();
        })(req, res, next)
    }
}




