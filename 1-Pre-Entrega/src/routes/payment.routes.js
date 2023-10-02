import express from "express";
import {
  createOrder,
  succes,
  receiveWebhook,
} from "../Controllers/payment.controller.js";

const paymentRouter = express.Router();

paymentRouter.post("/payment/:id", createOrder);
paymentRouter.get("/succes", succes);
paymentRouter.post("/:id/webhook", receiveWebhook);

export default paymentRouter;
