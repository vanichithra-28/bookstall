const express = require("express");
const router = express.Router();
const Book = require("../models/bookschema");

// Get all books
router.get("/", async (req, res) => {
  try {
    const data = await Book.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get featured books
router.get("/featured/list", async (req, res) => {
  try {
    const featuredBooks = await Book.find({ featured: true });
    res.json(featuredBooks);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
// Get single book by ID
router.get("/:id", async (req, res) => {
  try {
    const foundBook = await Book.findById(req.params.id);
    if (!foundBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(foundBook);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
// Update book by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,

      { new: true }, // return the updated document
    );
    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(updatedBook);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
// Mark random books as featured
router.patch("/featured/random/:count", async (req, res) => {
  try {
    const count = parseInt(req.params.count) || 1;

    // Get all book IDs
    const allBooks = await Book.find({}, "_id");
    if (allBooks.length === 0) {
      return res.status(404).json({ message: "No books available" });
    }

    // Shuffle and pick random IDs
    const shuffled = allBooks.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, count);

    // Update them to featured: true
    const updated = await Promise.all(
      selected.map((b) =>
        Book.findByIdAndUpdate(b._id, { featured: true }, { new: true }),
      ),
    );

    res.json({ message: "Random books marked as featured", updated });
  } catch (err) {
    console.error("Error marking random featured books:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});
// Add new book
router.post("/", async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.json({ message: "Book added" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update featured status
router.patch("/:id/featured", async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { featured: req.body.featured },
      { new: true },
    );
    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(updatedBook);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json({ message: "Book deleted successfully", deletedBook });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
// 🔹 Update stock
router.put("/update-stock/:id", async (req, res) => {
  try {
    const { stock } = req.body;

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { $inc: { stock: stock } }, // adds stock
      { new: true }
    );

    res.json(updatedBook);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
