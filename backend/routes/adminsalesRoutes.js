const express = require("express");
const router = express.Router();
const Book = require("../models/bookschema");
const Category = require("../models/categorieschema");
const Customer = require("../models/customerschema");
const Sale = require("../models/salesschema");

// GET dashboard stats
router.get("/stats", async (req, res) => {
  try {
    const booksCount = await Book.countDocuments();
    const categoriesCount = await Category.countDocuments();
    const customersCount = await Customer.countDocuments();
    const sales = await Sale.find();
    const salesToday = sales.reduce((sum, sale) => sum + Number(sale.total), 0);

    res.status(200).json({
      success: true,
      booksCount,
      categoriesCount,
      customersCount,
      salesToday,
    });
  } catch (err) {
    console.error("Failed to fetch dashboard stats:", err);
    res.status(500).json({ success: false, message: "Failed to fetch stats" });
  }
});

module.exports = router;