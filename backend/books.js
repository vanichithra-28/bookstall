// import mongoose
var mongoose = require("mongoose");

// create schema
var bookSchema = mongoose.Schema({
  name: String,
  author: String,
  price: Number,
  category: String,
  image: String,
  
});

// create model
var bookModel = mongoose.model("book", bookSchema);

// export model
module.exports = bookModel;