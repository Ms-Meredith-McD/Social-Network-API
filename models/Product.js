const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String },
  manufacturer: { type: String },
  wholesalePrice: { type: Number },
  qty: { type: Number }
})

const Product = mongoose.model("Product", productSchema);
module.exports = Product;