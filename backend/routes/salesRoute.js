const express = require("express");
const router = express.Router();
const Sale = require("../models/salesschema");


// ✅ ADD SALE
router.post("/add", async (req, res) => {
  try {
    const { book, customer, quantity, price } = req.body;

    const total = quantity * price;

    const newSale = new Sale({
      book,
      customer,
      quantity,
      price,
      total
    });

    await newSale.save();

    res.json({ message: "Sale added successfully" });

  } catch (err) {
    res.status(500).json(err);
  }
});


// ✅ GET ALL SALES
router.get("/", async (req, res) => {
  try {
    const sales = await Sale.find().sort({ date: -1 });
    res.json(sales);
  } catch (err) {
    res.status(500).json(err);
  }
});


// ✅ DELETE SALE (optional)
router.delete("/:id", async (req, res) => {
  try {
    await Sale.findByIdAndDelete(req.params.id);
    res.json({ message: "Sale deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;