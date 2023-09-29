import mercadopago from "mercadopago";
import { finalCart, updateStock } from "../libs/cart.libs.js";
import { createCart } from "../services/cart.services.js";

export const createOrder = async (req, res) => {
  const { cart } = req.body;
  const { id } = req.params;
  mercadopago.configure({
    access_token:
      "TEST-8408236685036362-092517-fb7805304fc7babd806f31d1a6e7748f-1491209842",
  });

  const carrito = cart.map((el) => ({
    title: el.nombre,
    unit_price: el.precio,
    currency_id: "ARS",
    quantity: el.cantidad,
    id: el.id,
  }));

  const result = await mercadopago.preferences.create({
    items: carrito,

    payer: {
      email: "maurohcardona@gmail.com",
    },
    back_urls: {
      success: "http://localhost:3000/pagos/succes",
      failure: "http://localhost:8080/pagos/failure",
      pending: "http://localhost:8080/pagos/pending",
    },

    notification_url: `https://92d5-186-148-207-242.ngrok.io/pagos/${id}/webhook`,
    statement_descriptor: "maurohcardona@gmail.com",
    additional_info: "maurohcardona@gmail.com",
  });

  res.send(result.body);
};

export const succes = async (req, res) => {
  res.send("seucces");
};

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
