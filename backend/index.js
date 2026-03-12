var express = require("express");
var port = 3008;
require("./db");

var customer = require("./customer");
var category = require("./categories");
var book = require("./books");
var cors = require("cors");

var app = express();

app.use(express.json());
app.use(cors());


// ADD DATA
app.post("/register", async (req, res) => {
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
// LOGIN ROUTE
// LOGIN ROUTE
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        message: "Email and password are required" 
      });
    }

    const user = await customer.findOne({ email: email });

    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: "Invalid email or password" 
      });
    }

    if (user.password !== password) {
      return res.status(401).json({ 
        success: false,
        message: "Invalid email or password" 
      });
    }

    // SUCCESS - Send back the actual role from the database
    const userData = {
      _id: user._id,
      username: user.username,
      email: user.email,
      phonenumber: user.phonenumber,
      role: user.role  // CHANGED THIS: Now it sends "admin" or "customer" from DB
    };

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: userData
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ 
      success: false,
      message: "Server error during login" 
    });
  }
});
// --- CATEGORY ROUTES ---

// 1. GET ALL CATEGORIES
app.get("/categories", async (req, res) => {
  try {
    const data = await category.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories" });
  }
});

// 2. ADD NEW CATEGORY
app.post("/categories", async (req, res) => {
  try {
    // FIX: Change req.body.category to req.body.name to match frontend axios call
   const newCategory = new category({
  name: req.body.name
    });

    await newCategory.save();
    res.status(200).json({ message: "Category added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error saving category" });
  }
});

// 3. UPDATE CATEGORY
app.put("/categories/:id", async (req, res) => {
  try {
    const id = req.params.id;
    // FIX: Use the category model, not customer
    await category.findByIdAndUpdate(id, { name: req.body.name });
    res.status(200).json({ message: "Category updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating category" });
  }
});

// 4. DELETE CATEGORY
app.delete("/categories/:id", async (req, res) => {
  try {
    const id = req.params.id;
    // FIX: Use the category model, not customer
    await category.findByIdAndDelete(id);
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting category" });
  }
});
// --- END OF CATEGORY ROUTES ---
// --- BOOK ROUTES ---
app.get("/books", async (req, res) => {
  try {
    const data = await book.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books" });
  }
});
app.get("/books/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await book.findById(id);

    if (!data) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching book" });
  }
});
// 2. ADD NEW BOOK
app.post("/books", async (req, res) => {
  try {
    const newBook = new book({
      name: req.body.name,
      author: req.body.author,
      price: req.body.price,
      category: req.body.category,
      image: req.body.image
    });

    await newBook.save();
    res.status(200).json({ message: "Book added successfully", data: newBook });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving book" });
  }
});

// 3. UPDATE BOOK
app.put("/books/:id", async (req, res) => {
  try {
    const id = req.params.id;
    // Pass the entire body to update all fields (name, author, price, etc.)
    const updatedBook = await book.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ message: "Book updated successfully", data: updatedBook });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating book" });
  }
});

// 4. DELETE BOOK
app.delete("/books/:id", async (req, res) => {
  try {
    const id = req.params.id;
    // FIX: Use the book model, not customer
    await book.findByIdAndDelete(id);
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting book" });
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