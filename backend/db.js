var mongoose = require("mongoose");
require("dotenv").config();
const mongourl = process.env.MONGO_URL || "mongodb+srv://test:test@cluster0.lpxusm0.mongodb.net/Project";
mongoose
  .connect(mongourl)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((e) => {
    console.log(e);
  });