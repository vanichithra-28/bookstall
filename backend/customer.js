// import mongoose
var mongoose = require("mongoose");

// create schema
var customerSchema = mongoose.Schema({
  username: String,
  email: String,
  phonenumber: Number,
  password: String
});

// create model
var customerModel = mongoose.model("customer", customerSchema);

// export model
module.exports = customerModel;