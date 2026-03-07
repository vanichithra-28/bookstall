var express = require("express");
var port = 3008;
require("./db");

var customer = require("./customer");
var cors = require("cors");

var app = express();

app.use(express.json());
app.use(cors());


// ADD DATA
app.post("/", async (req, res) => {
  try {
    console.log(req.body); // check incoming data

    
    const newCustomer = new customer({
      username: req.body.username,
      email: req.body.email,
      phonenumber: req.body.phonenumber,
      password: req.body.password
    });

    await newCustomer.save();

    res.status(200).json({ message: "data added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error saving data" });
  }
});


// GET DATA
app.get("/", async (req, res) => {
  try {
    const data = await customer.find();
    res.json(data);
  } catch (error) {
    res.send(error);
  }
});


// UPDATE DATA
app.put("/:id", async (req, res) => {
  try {
    var id = req.params.id;
    await customer.findByIdAndUpdate(id, req.body);
    res.send("data updated successfully");
  } catch (error) {
    console.log(error);
  }
});


// DELETE DATA
app.delete("/:id", async (req, res) => {
  try {
    var id = req.params.id;
    await customer.findByIdAndDelete(id);
    res.send("data deleted successfully");
  } catch (error) {
    console.log(error);
  }
});


app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});