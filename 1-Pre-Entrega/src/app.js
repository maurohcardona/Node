import express from "express";
import { __dirname, publics } from "./utils.js";
import indexRouter from "./routes/index.routes.js";
import { Server } from "socket.io";
import passport from "passport";
import { engine } from "express-handlebars";
import initializePassport from "./config/passport.config.js";
import cookieParser from "cookie-parser";
import config from "./config/config.js";
import { handleSocketEvents } from "./Controllers/message.controller.js";
import conection from "./config/db.config.js";
import addlogger from "./middlewares/logger.middleware.js";
import log from "./config/logs/devlogger.js";
import swaggerUiExpress from "swagger-ui-express";
import specs from "./config/docs.config.js";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

const port = config.server.port;
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.static(publics));
app.engine("handlebars", engine());
app.set("views", __dirname + "/Views");
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(addlogger);

initializePassport();
app.use(passport.initialize());

app.use("/docs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));
app.use("/", indexRouter);

export const httpServer = app.listen(port, () => {
  conection();
  log.http(`listening on port ${port}`);
});

const io = new Server(httpServer);
handleSocketEvents(io);
