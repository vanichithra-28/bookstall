var mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://test:test@cluster0.lpxusm0.mongodb.net/Project")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((e) => {
    console.log(e);
  });