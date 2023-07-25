import passport from 'passport';


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

export const isAdmin =  (strategy) => {
    return async(req, res, next) => {
        passport.authenticate(strategy, function(err, user, info){
            if(user.rol === 'admin') {
                next();
            }else {
                return res.status(403).send({ message: 'user in not admin'});
            }    
        })(req, res, next)
    }
}



