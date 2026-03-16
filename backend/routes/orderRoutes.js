const express = require("express");
const router = express.Router();
const Order = require("../models/orderSchema");

// Get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get single order by ID
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Create new order (with multiple items)
router.post("/", async (req, res) => {
  try {
    const { customerid, items, totalAmount } = req.body;

    const newOrder = new Order({
      customerid,
      items,          // ✅ array of cart items
      totalAmount,    // ✅ subtotal
    });

    await newOrder.save();
    res.json({ message: "Order created", order: newOrder });
  } catch (err) {
    console.error("Order creation error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Update order
router.put("/:id", async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedOrder) return res.status(404).json({ message: "Order not found" });
    res.json({ message: "Order updated", order: updatedOrder });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete order
router.delete("/:id", async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) return res.status(404).json({ message: "Order not found" });
    res.json({ message: "Order deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get orders for a specific customer
router.get("/customer/:customerid", async (req, res) => {
  try {
    const orders = await Order.find({ customerid: req.params.customerid });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;