import mongoose from "mongoose";
import mongoosepaginate from "mongoose-paginate-v2";

const collection = "products";

const schema = new mongoose.Schema({
  Title: {
    type: String,
  },
  Description: {
    type: String,
  },
  Price: {
    type: Number,
  },
  Thumbnail: {
    type: String,
  },
  Code: {
    type: Number,
  },
  Stock: {
    type: Number,
  },
  Category: {
    type: String,
  },
  owner: {
    type: String,
    default: "admincoder@coder.com",
  },
  status: {
    type: Boolean,
    default: true,
  },
});

schema.plugin(mongoosepaginate);
const productModel = new mongoose.model(collection, schema);

export default productModel;
