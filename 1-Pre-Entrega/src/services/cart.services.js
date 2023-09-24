import cartModel from "../models/carts.js";

export const createCart = async (newCart) => await cartModel.create(newCart);

export const getCarts = async (userId) =>
  await cartModel.findMany({ _id: email });

export const getCartById = async (id) => await cartModel.findById(id);

export const getCartByUserId = async (userId) =>
  await cartModel.find({ user: userId });

export const addCartByProductId = async (cid, pid) =>
  await cartModel.updateOne({ _id: cid }, { $push: { products: pid } });

export const updateCart = async (cid, pid) =>
  await cartModel.updateOne(
    { _id: cid, "Cart.cart": pid },
    { $set: { "Cart.$.quantity": quantity } },
    { new: true }
  );

export const deleteProductsCart = async (cid) =>
  await cartModel.findOneAndUpdate(
    { _id: cid },
    { $set: { Cart: [] } },
    { new: true }
  );

export const getCompleteCart = async (userId) =>
  await cartModel.find({ user: userId }).populate("Cart.cart");

export const addOnlyQuantity = async (cid, pid, quantity) => {
  try {
    if (quantity === undefined) {
      const cart = await cartModel.findById(cid);
      const product = cart.Cart.find((p) => p.cart.toString() === pid);
      if (product) {
        quantity = product.quantity + 1;
      }
    }
    await cartModel.updateCart(cid, pid);
  } catch (err) {
    req.logger.error("Error al modificar la cantidad", err);
  }
};
