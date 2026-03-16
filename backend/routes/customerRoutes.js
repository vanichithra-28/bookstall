const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const Customer = require("../models/customerschema"); // Mongoose model

// -------------------- REGISTER --------------------
router.post("/register", async (req, res) => {
  try {
    // Hash password before saving
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newCustomer = new Customer({
      ...req.body,
      password: hashedPassword,
    });

    await newCustomer.save();

    res.json({
      success: true,
      message: "Customer registered successfully",
      user: {
        _id: newCustomer._id,
        username: newCustomer.username,
        email: newCustomer.email,
        role: newCustomer.role,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ success: false, message: "Registration failed" });
  }
});

// -------------------- LOGIN --------------------
router.post("/login", async (req, res) => {
  try {
    const user = await Customer.findOne({ email: req.body.email });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    res.json({
      success: true,
      message: "Login success",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
});

// -------------------- FETCH USERS --------------------

// Get all users
router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    console.error("Fetch customers error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch customers" });
  }
});

// Get staff only
router.get("/staff", async (req, res) => {
  try {
    const staff = await Customer.find({ role: "staff" });
    res.json(staff);
  } catch (error) {
    console.error("Fetch staff error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch staff" });
  }
});

// Update staff
router.put("/staff/:id", async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }
    const updatedStaff = await Customer.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    if (!updatedStaff) {
      return res.status(404).json({ success: false, message: "Staff not found" });
    }
    res.json({ success: true, message: "Staff updated successfully", user: updatedStaff });
  } catch (error) {
    console.error("Update staff error:", error);
    res.status(500).json({ success: false, message: "Failed to update staff" });
  }
});
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedCustomer) {
      return res.status(404).json({ success: false, message: "Customer not found" });
    }

    res.json(updatedCustomer);
  } catch (err) {
    console.error("Status update error:", err);
    res.status(500).json({ success: false, message: "Failed to update status" });
  }
});


// Delete staff
router.delete("/staff/:id", async (req, res) => {
  try {
    const deletedStaff = await Customer.findByIdAndDelete(req.params.id);
    if (!deletedStaff) {
      return res.status(404).json({ success: false, message: "Staff not found" });
    }
    res.json({ success: true, message: "Staff deleted successfully" });
  } catch (error) {
    console.error("Delete staff error:", error);
    res.status(500).json({ success: false, message: "Failed to delete staff" });
  }
});

// Get admins only
router.get("/admin", async (req, res) => {
  try {
    const admins = await Customer.find({ role: "admin" });
    res.json(admins);
  } catch (error) {
    console.error("Fetch admin error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch admins" });
  }
});

// Get customers only
router.get("/customer", async (req, res) => {
  try {
    const customersOnly = await Customer.find({ role: "customer" });
    res.json(customersOnly);
  } catch (error) {
    console.error("Fetch customer error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch customers" });
  }
});

module.exports = router;