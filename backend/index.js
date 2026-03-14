const express = require("express");
const cors = require("cors");
require("./db");

const customerRoutes = require("./routes/customerRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const bookRoutes = require("./routes/bookRoutes");

const app = express();
const port = 3008;

app.use(express.json());
app.use(cors());

// connect routes
app.use("/customers", customerRoutes);
app.use("/categories", categoryRoutes);
app.use("/books", bookRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});