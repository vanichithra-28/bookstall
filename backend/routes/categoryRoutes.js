const express = require("express");
const router = express.Router();
const category = require("../models/categorieschema");

// Get categories
router.get("/", async (req, res) => {
  const data = await category.find();
  res.json(data);
});

// Add category
router.post("/", async (req, res) => {
  const newCategory = new category({ name: req.body.name });
  await newCategory.save();
  res.json({ message: "Category added" });
});

module.exports = router;