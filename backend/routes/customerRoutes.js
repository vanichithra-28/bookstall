const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const customer = require("../models/customerschema");

// Register
router.post("/register", async (req, res) => {
  try {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newCustomer = new customer({
      ...req.body,
      password: hashedPassword,
    });

    await newCustomer.save();

    res.json({
      success: true,
      message: "Customer registered successfully",
      user: {
        _id: newCustomer._id,
        name: newCustomer.name,
        email: newCustomer.email,
        role: newCustomer.role,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ success: false, message: "Registration failed" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const user = await customer.findOne({ email: req.body.email });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    // Compare entered password with hashed password
    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    // Return safe user info (no password)
    res.json({
      success: true,
      message: "Login success",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
});

module.exports = router;