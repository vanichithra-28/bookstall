const express = require("express");
const router = express.Router();
const book = require("../models/bookschema");

// Get books
router.get("/", async (req, res) => {
  const data = await book.find();
  res.json(data);
});

// Add book
router.post("/", async (req, res) => {
  const newBook = new book(req.body);
  await newBook.save();
  res.json({ message: "Book added" });
});

module.exports = router;