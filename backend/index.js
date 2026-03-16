const express = require("express");
const cors = require("cors");
require("./db");

const customerRoutes = require("./routes/customerRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const bookRoutes = require("./routes/bookRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cartRoutes = require("./routes/cartRoutes");

const app = express();
const port = 3008;

app.use(express.json());
app.use(cors());

// connect routes
app.use("/customers", customerRoutes);
app.use("/categories", categoryRoutes);
app.use("/books", bookRoutes);
app.use("/orders", orderRoutes);
app.use("/cart", cartRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});