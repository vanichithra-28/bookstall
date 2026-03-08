import React, { useState } from "react";
import Navbar from "../Navbar";
import {
  Container,
  Typography,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper
} from "@mui/material";

function StockManagement() {

  const [bookName, setBookName] = useState("");
  const [stock, setStock] = useState("");
  const [books, setBooks] = useState([]);

  const addStock = () => {

    if (!bookName || !stock) {
      alert("Enter book name and stock");
      return;
    }

    const newBook = {
      name: bookName,
      quantity: Number(stock)
    };

    setBooks([...books, newBook]);

    setBookName("");
    setStock("");
  };

  // Check availability
  const checkAvailability = (qty) => {
    if (qty === 0) return "Out of Stock";
    if (qty <= 10) return "Low Stock";
    return "Available";
  };

  return (
    <>
      <Navbar />

      <Container sx={{ marginTop: 4 }}>

        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#1976d2" }}
        >
          Stock Management
        </Typography>

        <TextField
          label="Book Name"
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
          sx={{ marginRight: 2 }}
        />

        <TextField
          label="Stock Quantity"
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          sx={{ marginRight: 2 }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={addStock}
        >
          Add Stock
        </Button>

        <Paper sx={{ marginTop: 4 }}>
          <Table>

            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell sx={{ fontWeight: "bold" }}>Book Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Stock Quantity</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Availability</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>

              {books.map((book, index) => (
                <TableRow key={index}>
                  <TableCell>{book.name}</TableCell>
                  <TableCell>{book.quantity}</TableCell>
                  <TableCell
                    sx={{
                      color:
                        book.quantity === 0
                          ? "red"
                          : book.quantity <= 10
                          ? "orange"
                          : "green",
                      fontWeight: "bold"
                    }}
                  >
                    {checkAvailability(book.quantity)}
                  </TableCell>
                </TableRow>
              ))}

            </TableBody>

          </Table>
        </Paper>

      </Container>
    </>
  );
}

export default StockManagement;