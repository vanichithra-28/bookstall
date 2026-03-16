const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerid: String,
  items: [
    {
      bookId: String,
      bookname: String,
      price: Number,
      quantity: Number,
      total_price: Number,
      image: String,
    }
  ],
  totalAmount: Number,
  orderdate: { type: Date, default: Date.now },
});

const Order = mongoose.model("order", orderSchema);

module.exports = Order;