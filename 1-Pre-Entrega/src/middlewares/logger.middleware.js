import devlogger from "../config/logs/devlogger.js";
import prodlogger from "../config/logs/prodlogger.js";
import config from "../config/config.js";

const env = config.server.env;

const addlogger = (req, res, next) => {
  if (env === "Development") {
    req.logger = devlogger;
    next();
  } else if (env === "Production") {
    req.logger = prodlogger;
    next();
  }
};

export default addlogger;
