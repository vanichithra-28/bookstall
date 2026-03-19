import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import { motion } from "framer-motion";

const MotionBox = motion.create(Box);
const MotionTypography = motion.create(Typography);
const MotionTableRow = motion.create(TableRow);

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

function ViewBooks() {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [booksRes, categoriesRes] = await Promise.all([
          fetch("http://localhost:3008/books"),
          fetch("http://localhost:3008/categories"),
        ]);

        if (!booksRes.ok || !categoriesRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const booksData = await booksRes.json();
        const categoriesData = await categoriesRes.json();

        setBooks(booksData);
        setCategories(categoriesData);
      } catch (err) {
        console.error("Failed to fetch:", err);
        setError(err.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getCategoryName = (id) => {
    const cat = categories.find((c) => c._id === id);
    return cat ? cat.name : "—";
  };

  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      sx={{ minHeight: "100vh", background: "linear-gradient(135deg, #fff4eb 0%, #fff2e6 100%)", position: "relative", overflow: "hidden", py: 5 }}
    >
      <FloatingBook delay={0} x="5%" y="20%" rotation={-15} />
      <FloatingBook delay={0.5} x="90%" y="25%" rotation={10} />
      <FloatingBook delay={1} x="85%" y="75%" rotation={-10} />
      <FloatingBook delay={1.5} x="10%" y="70%" rotation={12} />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <MotionTypography
          variant="h4"
          align="center"
          gutterBottom
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          sx={{ fontWeight: "bold", color: "#65350F", mb: 3 }}
        >
          View Books
        </MotionTypography>

        <Paper elevation={3} sx={{ padding: 3, background: "rgba(255,255,255,0.9)", backdropFilter: "blur(10px)" }}>
          {loading ? (
            <Box display="flex" justifyContent="center" py={6}>
              <CircularProgress color="warning" />
            </Box>
          ) : error ? (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><b>ID</b></TableCell>
                  <TableCell><b>Book Name</b></TableCell>
                  <TableCell><b>Author</b></TableCell>
                  <TableCell><b>Price</b></TableCell>
                  <TableCell><b>Stock</b></TableCell>
                  <TableCell><b>Category</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {books.length === 0 ? (
                  <MotionTableRow initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <TableCell colSpan={6} align="center" sx={{ py: 5 }}>
                      No Books Available
                    </TableCell>
                  </MotionTableRow>
                ) : (
                  books.map((book, index) => (
                    <MotionTableRow key={book._id || index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.06 }}>
                      <TableCell>{book._id}</TableCell>
                      <TableCell>{book.name}</TableCell>
                      <TableCell>{book.author}</TableCell>
                      <TableCell>₹{book.price?.toFixed(2) || book.price}</TableCell>
                      <TableCell>{book.stock ?? "N/A"}</TableCell>
                      <TableCell>{getCategoryName(book.category)}</TableCell>
                    </MotionTableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </Paper>
      </Container>
    </MotionBox>
  );
}

export default ViewBooks;