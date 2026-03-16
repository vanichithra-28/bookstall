import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TextField,
  Button
} from "@mui/material";

function UpdateStock() {
  const [books, setBooks] = useState([]);
  const [newStock, setNewStock] = useState({}); // track stock edits per book

  // Fetch books from backend
  useEffect(() => {
    axios.get("http://localhost:3008/books")
      .then(res => setBooks(res.data))
      .catch(err => console.error("Error fetching books:", err));
  }, []);

  // Handle stock input change
  const handleStockChange = (bookId, value) => {
    setNewStock({ ...newStock, [bookId]: value });
  };

  // Update stock in DB
  const updateStock = async (bookId) => {
    try {
      const updatedValue = Number(newStock[bookId]);
      if (isNaN(updatedValue) || updatedValue < 0) {
        alert("Please enter a valid stock number");
        return;
      }

      await axios.put(`http://localhost:3008/books/${bookId}`, {
        stock: updatedValue,
      });

      // Refresh book list after update
      const refreshed = await axios.get("http://localhost:3008/books");
      setBooks(refreshed.data);

      // Clear input for that book
      setNewStock({ ...newStock, [bookId]: "" });

      alert("Stock updated successfully!");
    } catch (error) {
      console.error("Error updating stock:", error);
      alert("Failed to update stock");
    }
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#1976d2" }}
      >
        Update Stock
      </Typography>

      <Paper elevation={3} sx={{ padding: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Book ID</b></TableCell>
              <TableCell><b>Book Name</b></TableCell>
              <TableCell><b>Category</b></TableCell>
              <TableCell><b>Current Stock</b></TableCell>
              <TableCell><b>New Stock</b></TableCell>
              <TableCell><b>Action</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {books.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No books available
                </TableCell>
              </TableRow>
            ) : (
              books.map((book) => (
                <TableRow key={book._id}>
                  <TableCell>{book._id}</TableCell>
                  <TableCell>{book.name}</TableCell>
                  <TableCell>{book.category}</TableCell>
                  <TableCell>{book.stock}</TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      size="small"
                      value={newStock[book._id] || ""}
                      onChange={(e) =>
                        handleStockChange(book._id, e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => updateStock(book._id)}
                    >
                      Update
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}

export default UpdateStock;