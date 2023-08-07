import "dotenv/config";

let config = {};

config.server = {
    port: process.env.PORT,
    env: process.env.NODE_ENV
}

config.db = {
    dbconnection: process.env.DB
}

config.passport = {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackUrl: process.env.CALLBACK_URL
}

config.jwt = {
    secretkey: process.env.SECRET_KEY,
};
export default config;