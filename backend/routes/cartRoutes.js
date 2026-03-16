const express = require("express");
const router = express.Router();
const Cart = require("../models/cartschema");

// ➡️ Add item to cart
router.post("/add", async (req, res) => {
  try {
    const { bookId, bookname, price, quantity, customerid, image } = req.body;
    const total_price = price * quantity;

    const newItem = new Cart({
      bookId,
      bookname,
      price,
      quantity,
      customerid,
      image,
      total_price,
    });

    await newItem.save();
    res.json(newItem);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ➡️ Get all cart items for a customer
router.get("/customer/:customerid", async (req, res) => {
  try {
    const status = req.query.status || "active";
    const cartItems = await Cart.find({ customerid: req.params.customerid, status });
    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


// ➡️ Get cart item by ID
router.get("/:id", async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ➡️ Update quantity
router.put("/:id", async (req, res) => {
  try {
    const { quantity } = req.body;
    const item = await Cart.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.quantity = quantity;
    item.total_price = item.price * item.quantity;
    await item.save();

    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ➡️ Delete item
router.delete("/:id", async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;