import mercadopago from "mercadopago";
import { finalCart, updateStock } from "../libs/cart.libs.js";
import { createCart } from "../services/cart.services.js";

export const receiveWebhook = async (req, res) => {
  const user = req.params;
  const payment = req.query;

  if (payment.type === "payment") {
    const data = await mercadopago.payment.findById(payment["data.id"]);
    const cart = data.body.additional_info.items;
    const total = data.body.transaction_amount;
    const newCart = finalCart(cart, user.id, total);
    await updateStock(cart);
    await createCart(newCart);
  }

  res.send("Compra exitosa");
};
