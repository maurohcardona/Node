import "dotenv/config";

let config = {};

config.server = {
  port: process.env.PORT,
  env: process.env.NODE_ENV,
};

config.db = {
  dbconnection: process.env.DB,
  dbtest: process.env.DB_TEST,
};

config.passport = {
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackUrl: process.env.CALLBACK_URL,
};

config.jwt = {
  secretkey: process.env.SECRET_KEY,
};

config.email = {
  relay: process.env.relay,
  mailPort: process.env.mailPort,
  userMail: process.env.mailuser,
  userpass: process.env.passuser,
};

config.url = {
  baseUrl: process.env.baseUrl,
  recoveryPassUrl: process.env.recoveryPassUrl,
};
export default config;
