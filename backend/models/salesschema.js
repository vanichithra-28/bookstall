var mongoose = require("mongoose");

var salesSchema = mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "book",
    required: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customer",
    required: true
  },
  quantity: Number,
  price: Number,
  total: Number,
  date: {
    type: Date,
    default: Date.now
  }
});

var salesModel = mongoose.model("sale", salesSchema);

module.exports = salesModel;