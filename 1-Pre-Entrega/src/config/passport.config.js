import passport from "passport";
import * as userService from "../services/user.services.js";
import GitHubStrategy from "passport-github2";
import "dotenv/config";
import config from "./config.js";
import * as cartService from "../services/cart.services.js";
import jwtp from "passport-jwt";
import jwt from "jsonwebtoken";

const clientId = config.passport.clientId;
const clientSecret = config.passport.clientSecret;
const callbackUrl = config.passport.callbackUrl;

const JWTStrategy = jwtp.Strategy;
const ExtractJWT = jwtp.ExtractJwt;

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["cookieToken"];
  }
  return token;
};

const initializePassport = () => {
  passport.use(
    "github",
    new GitHubStrategy.Strategy(
      {
        clientID: clientId,
        clientSecret: clientSecret,
        callbackUrl: callbackUrl,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await userService.getUser(profile._json.email);
          if (!user) {
            const email = profile._json.email
              ? profile._json.email
              : "Not mail";
            let newUser = {
              firstname: profile._json.name,
              lastname: "",
              email,
              age: "",
              password: "",
            };
            await userService.createUser(newUser);
            const { firstname, lastname } = newUser;
            const token = jwt.sign(
              { firstname, lastname, email, age },
              "SecretCode"
            );
            done(null, token);
          } else {
            const { firstname, lastname, email, cart, age } = user;
            const token = jwt.sign(
              { firstname, lastname, email, age },
              "SecretCode"
            );
            done(null, token);
          }
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: "SecretCode",
      },
      async (jwt_payload, done) => {
        try {
          // (jwt_paconsole.logyload);
          return done(null, jwt_payload);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  let user = userService.getUserById(id);
  done(null, user);
});

export default initializePassport;
