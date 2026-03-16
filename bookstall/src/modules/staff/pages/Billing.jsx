import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper
} from "@mui/material";

function Billing() {
  const [customers, setCustomers] = useState([]);
  const [books, setBooks] = useState([]);
  const [customerId, setCustomerId] = useState("");
  const [bookId, setBookId] = useState("");
  const [bookName, setBookName] = useState("");
  const [price, setPrice] = useState(0);
  const [qty, setQty] = useState(1);
  const [cart, setCart] = useState([]);

  // Fetch customers and books from backend
  useEffect(() => {
    axios.get("http://localhost:3008/customers").then(res => setCustomers(res.data));
    axios.get("http://localhost:3008/books").then(res => setBooks(res.data));
  }, []);

  const handleCustomerChange = (e) => setCustomerId(e.target.value);

  const handleBookChange = (e) => {
    const selected = books.find((b) => b._id === e.target.value);
    if (selected) {
      setBookId(selected._id);
      setBookName(selected.name);
      setPrice(Number(selected.price));
    }
  };

  const addToBill = () => {
    if (!customerId || !bookId || !qty) {
      alert("Select customer, book and quantity");
      return;
    }

    const total = price * qty;
    const existing = cart.find((item) => item.bookId === bookId);

    if (existing) {
      // merge quantities if same book is added again
      existing.qty += qty;
      existing.total = existing.price * existing.qty;
      setCart([...cart]);
    } else {
      const item = { bookId, bookName, price, qty, total };
      setCart([...cart, item]);
    }

    // reset book selection
    setBookId("");
    setBookName("");
    setPrice(0);
    setQty(1);
  };

  const grandTotal = cart.reduce((sum, item) => sum + item.total, 0);

  return (
    <Container sx={{ mt: 5 }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#1976d2" }}
      >
        Billing / Sales
      </Typography>

      <Paper sx={{ padding: 3, mb: 3 }} elevation={3}>
        {/* Customer dropdown */}
        <TextField
          select
          label="Select Customer"
          fullWidth
          margin="normal"
          value={customerId}
          onChange={handleCustomerChange}
        >
          {customers.filter((c) => c.role === "customer") .map((c) => (
            <MenuItem key={c._id} value={c._id}>
              {c.username}            </MenuItem>
          ))}
        </TextField>

        {/* Book dropdown */}
        <TextField
          select
          label="Select Book"
          fullWidth
          margin="normal"
          value={bookId}
          onChange={handleBookChange}
        >
          {books.map((b) => (
            <MenuItem key={b._id} value={b._id}>
              {b.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Price"
          fullWidth
          margin="normal"
          value={price}
          disabled
        />
        <TextField
          label="Quantity"
          type="number"
          fullWidth
          margin="normal"
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
        />

        <Button variant="contained" sx={{ mt: 2 }} onClick={addToBill}>
          Add To Bill
        </Button>
      </Paper>

      <Paper elevation={3} sx={{ padding: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Bill Items
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Book</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.bookName}</TableCell>
                <TableCell>₹ {item.price}</TableCell>
                <TableCell>{item.qty}</TableCell>
                <TableCell>₹ {item.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Typography variant="h6" sx={{ mt: 2 }}>
          Grand Total: ₹ {grandTotal}
        </Typography>
      </Paper>
    </Container>
  );
}

export default Billing;