const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String },
  image: [{ type: String }],
  colors: [{ type: String }], 
  description: { type: String },
  price: { type: Number },
  discountPrice: { type: Number },
  quantity: { type: Number },
  category: { type: String }, 
  user_email: { type: String },
});
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
