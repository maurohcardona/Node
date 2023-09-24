import mongoose from "mongoose";

const collection = "carts";

const schema = new mongoose.Schema(
  {
    Cart: {
      type: [
        {
          cart: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "products",
          },
          quantity: { type: Number, default: 1 },
        },
      ],
      default: [],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    total: Number,
  },
  {
    timestamps: true,
  }
);

const cartModel = new mongoose.model(collection, schema);

export default cartModel;
