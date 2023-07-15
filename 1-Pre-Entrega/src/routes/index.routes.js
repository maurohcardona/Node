import express  from "express";
import cartRouter from "./carts.routes.js";
import messageRouter from "./messages.routes.js";
import productRouter from "./products.routes.js";
import userRouter from "./users.routes.js";

const indexRouter = express.Router();

indexRouter.use('/', cartRouter);
indexRouter.use('/', userRouter);
indexRouter.use('/products', productRouter);
indexRouter.use('/', messageRouter);

export default indexRouter;