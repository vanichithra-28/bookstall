import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container, Typography, TextField, Button,
  Table, TableHead, TableRow, TableCell,
  TableBody, Paper, Select, MenuItem, Box
} from "@mui/material";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

/* Motion wrappers */
const MotionBox = motion.create(Box);
const MotionTypography = motion.create(Typography);

/* Floating Books */
const FloatingBook = ({ delay, x, y, rotation }) => (
  <MotionBox
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0.1, 0.2, 0.1],
      scale: 1,
      y: [0, -15, 0],
      rotate: [rotation, rotation + 5, rotation],
    }}
    transition={{ duration: 4, repeat: Infinity, delay }}
    sx={{
      position: "absolute",
      left: x,
      top: y,
      width: 40,
      height: 50,
      background: "linear-gradient(135deg, #a0522d, #65350F)",
      borderRadius: "2px 6px 6px 2px",
      pointerEvents: "none",
      zIndex: 0,
    }}
  />
);

function StockManagement() {
  const [stock, setStock] = useState("");
  const [selectedBook, setSelectedBook] = useState("");
  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3008/books")
      .then(res => setBookList(res.data))
      .catch(err => console.log(err));
  }, []);

  const addStock = async () => {
    if (!selectedBook || !stock) {
      alert("Select book and enter stock");
      return;
    }

    try {
      await axios.put(
        `http://localhost:3008/books/update-stock/${selectedBook}`,
        { stock: Number(stock) }
      );

      alert("Stock updated successfully");

      const updated = await axios.get("http://localhost:3008/books");
      setBookList(updated.data);

      setSelectedBook("");
      setStock("");

    } catch (err) {
      console.log(err);
    }
  };

  const checkAvailability = (qty) => {
    if (qty === 0) return "Out of Stock";
    if (qty <= 10) return "Low Stock";
    return "Available";
  };

  return (
    <>
      <Navbar />

      <MotionBox
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        sx={{
          background: "linear-gradient(135deg, #fff4eb 0%, #fff2e6 100%)",
          minHeight: "100vh",
          py: 6,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Floating Books */}
        <FloatingBook delay={0} x="5%" y="15%" rotation={-15} />
        <FloatingBook delay={0.5} x="92%" y="20%" rotation={10} />
        <FloatingBook delay={1} x="88%" y="70%" rotation={-10} />

        <Container sx={{ position: "relative", zIndex: 1 }}>

          {/* Title */}
          <MotionTypography
            variant="h3"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            sx={{ fontWeight: "bold", color: "#65350F", mb: 3 }}
          >
            Stock Management
          </MotionTypography>

          {/* Controls */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            sx={{ mb: 3, display: "flex", flexWrap: "wrap", gap: 2 }}
          >
            <Select
              value={selectedBook}
              onChange={(e) => setSelectedBook(e.target.value)}
              displayEmpty
              sx={{ minWidth: 200 }}
            >
              <MenuItem value="">Select Book</MenuItem>

              {bookList.map((book) => (
                <MenuItem key={book._id} value={book._id}>
                  {book.name}
                </MenuItem>
              ))}
            </Select>

            <TextField
              label="Stock Quantity"
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />

            <Button
              variant="contained"
              onClick={addStock}
              sx={{
                bgcolor: "#a0522d",
                "&:hover": { bgcolor: "#65350F" }
              }}
            >
              Add Stock
            </Button>
          </MotionBox>

          {/* Table */}
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Paper
              sx={{
                borderRadius: 3,
                background: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(10px)",
                overflow: "hidden",
              }}
            >
              <Table>

                <TableHead sx={{ backgroundColor: "#a0522d" }}>
                  <TableRow>
                    <TableCell sx={{ color: "#fff" }}>Book Name</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Stock</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Status</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {bookList.map((b, index) => (
                    <motion.tr
                      key={b._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <TableCell>{b.name}</TableCell>
                      <TableCell>{b.stock}</TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 600,
                          color:
                            b.stock === 0
                              ? "red"
                              : b.stock <= 10
                              ? "orange"
                              : "#65350F"
                        }}
                      >
                        {checkAvailability(b.stock)}
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>

              </Table>
            </Paper>
          </MotionBox>

        </Container>
      </MotionBox>
    </>
  );
}

export default StockManagement;