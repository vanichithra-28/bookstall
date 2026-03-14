// import mongoose
var mongoose = require("mongoose");

// create schema
var customerSchema = mongoose.Schema({
  username: String,
  email: String,
  phonenumber: Number,
  password: String,
  role: { 
    type: String, 
    enum: ["customer", "staff", "admin"], 
    default: "customer"   // ← most users are customers
  },
});

// create model
var customerModel = mongoose.model("customer", customerSchema);

// export model
module.exports = customerModel;