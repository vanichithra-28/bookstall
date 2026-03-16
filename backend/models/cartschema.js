const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  bookId: String,
  bookname: String,
  price: Number,
  quantity: Number,
  customerid: String,
  image: String,
  total_price: Number,
  status: { type: String, default: "active" }  // ✅ new field
});       // ✅ Add this
const Cart = mongoose.model("cart", cartSchema);

module.exports = Cart;