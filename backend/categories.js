// import mongoose
var mongoose = require("mongoose");

// create schema
var categorySchema = mongoose.Schema({
  name: String,
  
});

// create model
var categoryModel = mongoose.model("category", categorySchema);

// export model
module.exports = categoryModel;