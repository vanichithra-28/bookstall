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
  Button,
  Box,
} from "@mui/material";
import { motion } from "framer-motion";

const MotionBox = motion.create(Box);
const MotionTypography = motion.create(Typography);
const MotionTableRow = motion.create(TableRow);
const MotionButton = motion.create(Button);

/* 📚 Floating Book */
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
      background: "linear-gradient(135deg, #a0522d 0%, #65350F 100%)",
      borderRadius: "2px 6px 6px 2px",
      pointerEvents: "none",
    }}
  />
);

/* ✨ Sparkle */
const Sparkle = ({ delay, x, y }) => (
  <MotionBox
    animate={{
      opacity: [0, 1, 0],
      scale: [0.5, 1, 0.5],
      rotate: [0, 180, 360],
    }}
    transition={{ duration: 3, repeat: Infinity, delay }}
    sx={{
      position: "absolute",
      left: x,
      top: y,
      width: 8,
      height: 8,
      "&::before, &::after": {
        content: '""',
        position: "absolute",
        background: "#a0522d",
      },
      "&::before": { width: 2, height: 8, left: 3 },
      "&::after": { width: 8, height: 2, top: 3 },
    }}
  />
);

function UpdateStock() {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newStock, setNewStock] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const booksRes = await axios.get("http://localhost:3008/books");
        setBooks(booksRes.data);

        const catRes = await axios.get("http://localhost:3008/categories");
        setCategories(catRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  const handleStockChange = (bookId, value) => {
    setNewStock({ ...newStock, [bookId]: value });
  };

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

      const refreshed = await axios.get("http://localhost:3008/books");
      setBooks(refreshed.data);

      setNewStock({ ...newStock, [bookId]: "" });

      alert("Stock updated successfully!");
    } catch (error) {
      console.error("Error updating stock:", error);
      alert("Failed to update stock");
    }
  };

  const getCategoryName = (id) => {
    const cat = categories.find((c) => c._id === id);
    return cat ? cat.name : "Loading...";
  };

  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: {
      scale: 1.01,
      backgroundColor: "rgba(160,82,45,0.08)",
    },
  };

  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #fff4eb 0%, #fff2e6 100%)",
        position: "relative",
        overflow: "hidden",
        py: 5,
      }}
    >
      {/* 📚 Floating Books */}
      <FloatingBook delay={0} x="5%" y="20%" rotation={-15} />
      <FloatingBook delay={0.5} x="90%" y="25%" rotation={10} />
      <FloatingBook delay={1} x="85%" y="75%" rotation={-10} />
      <FloatingBook delay={1.5} x="10%" y="70%" rotation={12} />

      {/* ✨ Sparkles */}
      <Sparkle delay={0.3} x="20%" y="30%" />
      <Sparkle delay={0.8} x="80%" y="40%" />
      <Sparkle delay={1.2} x="60%" y="80%" />

      {/* Background blob */}
      <MotionBox
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
        sx={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(160,82,45,0.15) 0%, transparent 70%)",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <MotionBox
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          sx={{ textAlign: "center", mb: 4 }}
        >
          <MotionTypography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#65350F" }}
          >
            Update Stock
          </MotionTypography>

          <MotionBox
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            sx={{
              height: 4,
              width: 120,
              mx: "auto",
              mt: 1,
              background: "linear-gradient(90deg, #a0522d, #65350F)",
              borderRadius: 2,
            }}
          />
        </MotionBox>

        {/* Table */}
        <Paper
          sx={{
            p: 2,
            background: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>Book ID</b></TableCell>
                <TableCell><b>Book Name</b></TableCell>
                <TableCell><b>Category</b></TableCell>
                <TableCell><b>Stock</b></TableCell>
                <TableCell><b>New Stock</b></TableCell>
                <TableCell><b>Action</b></TableCell>
              </TableRow>
            </TableHead>

            <motion.tbody
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {books.map((book) => (
                <MotionTableRow
                  key={book._id}
                  variants={rowVariants}
                  whileHover="hover"
                >
                  <TableCell>{book._id}</TableCell>
                  <TableCell>{book.name}</TableCell>
                  <TableCell>{getCategoryName(book.category)}</TableCell>
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
                    <MotionButton
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      variant="contained"
                      sx={{
                        bgcolor: "#a0522d",
                        "&:hover": { bgcolor: "#65350F" },
                      }}
                      onClick={() => updateStock(book._id)}
                    >
                      Update
                    </MotionButton>
                  </TableCell>
                </MotionTableRow>
              ))}
            </motion.tbody>
          </Table>
        </Paper>
      </Container>
    </MotionBox>
  );
}

export default UpdateStock;