import "dotenv/config";

let config = {};

config.server = {
    port: process.env.PORT
}

config.db = {
    dbconnection: process.env.DB
}

config.passport = {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackUrl: process.env.CALLBACK_URL
}
export default config;