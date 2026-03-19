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
  Paper,
  Box,
} from "@mui/material";
import { motion } from "framer-motion";

const MotionBox = motion.create(Box);
const MotionTypography = motion.create(Typography);
const MotionTableRow = motion.create(TableRow);
const MotionButton = motion.create(Button);

/* Floating Book */
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

/* Sparkle */
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

function Billing() {
  const [customers, setCustomers] = useState([]);
  const [books, setBooks] = useState([]);
  const [customerId, setCustomerId] = useState("");
  const [bookId, setBookId] = useState("");
  const [bookName, setBookName] = useState("");
  const [price, setPrice] = useState(0);
  const [qty, setQty] = useState(1);
  const [cart, setCart] = useState([]);
  const [showInvoice, setShowInvoice] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3008/customers").then(res => setCustomers(res.data));
    axios.get("http://localhost:3008/books").then(res => setBooks(res.data));
  }, []);

  const handleBookChange = (e) => {
    const selected = books.find((b) => b._id === e.target.value);
    if (selected) {
      setBookId(selected._id);
      setBookName(selected.name);
      setPrice(Number(selected.price));
    }
  };

  const getCustomerName = () => {
    const c = customers.find((c) => c._id === customerId);
    return c ? c.username : "";
  };

  const addToBill = () => {
    if (!customerId || !bookId || !qty) {
      alert("Select customer, book and quantity");
      return;
    }

    const total = price * qty;
    const existing = cart.find((item) => item.bookId === bookId);

    if (existing) {
      existing.qty += qty;
      existing.total = existing.price * existing.qty;
      setCart([...cart]);
    } else {
      setCart([...cart, { bookId, bookName, price, qty, total }]);
    }

    setBookId("");
    setPrice(0);
    setQty(1);
  };

  const grandTotal = cart.reduce((sum, item) => sum + item.total, 0);

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
      {/* Floating elements */}
      <FloatingBook delay={0} x="5%" y="15%" rotation={-15} />
      <FloatingBook delay={0.5} x="90%" y="20%" rotation={10} />
      <FloatingBook delay={1} x="85%" y="70%" rotation={-10} />

      <Sparkle delay={0.3} x="20%" y="30%" />
      <Sparkle delay={0.8} x="80%" y="40%" />

      {/* Background blob */}
      <MotionBox
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
        sx={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(160,82,45,0.15) 0%, transparent 70%)",
        }}
      />

      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <MotionTypography
          variant="h4"
          align="center"
          sx={{ fontWeight: "bold", color: "#65350F", mb: 3 }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Billing / Sales
        </MotionTypography>

        {/* Form */}
        <Paper sx={{ p: 3, mb: 3 }} elevation={3}>
          <TextField
            select
            label="Select Customer"
            fullWidth
            margin="normal"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
          >
            {customers.filter(c => c.role === "customer").map((c) => (
              <MenuItem key={c._id} value={c._id}>
                {c.username}
              </MenuItem>
            ))}
          </TextField>

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

          <TextField label="Price" fullWidth margin="normal" value={price} disabled />
          <TextField
            label="Quantity"
            type="number"
            fullWidth
            margin="normal"
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
          />

          <MotionButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variant="contained"
            sx={{ mt: 2, bgcolor: "#a0522d", "&:hover": { bgcolor: "#65350F" } }}
            onClick={addToBill}
          >
            Add To Bill
          </MotionButton>
        </Paper>

        {/* Table */}
        <Paper elevation={3} sx={{ p: 2 }}>
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
                <MotionTableRow
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.01 }}
                >
                  <TableCell>{item.bookName}</TableCell>
                  <TableCell>₹ {item.price}</TableCell>
                  <TableCell>{item.qty}</TableCell>
                  <TableCell>₹ {item.total}</TableCell>
                </MotionTableRow>
              ))}
            </TableBody>
          </Table>

          <MotionTypography variant="h6" sx={{ mt: 2 }}>
            Grand Total: ₹ {grandTotal}
          </MotionTypography>

          {/*          {/* Proceed Button */}
          <MotionButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variant="contained"
            sx={{
              mt: 2,
              bgcolor: "#65350F",
              "&:hover": { bgcolor: "#4a260b" },
            }}
            onClick={() => {
              if (cart.length === 0) {
                alert("Cart is empty!");
                return;
              }
              setShowInvoice(true);
            }}
          >
            Proceed to Invoice
          </MotionButton>
        </Paper>

        {/* Invoice */}
        {showInvoice && (
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            sx={{
              mt: 4,
              p: 3,
              borderRadius: 2,
              background: "rgba(255,255,255,0.95)",
            }}
          >
            <Typography variant="h5" sx={{ mb: 2, color: "#65350F" }}>
              Invoice
            </Typography>

            <Typography><b>Customer:</b> {getCustomerName()}</Typography>
            <Typography><b>Date:</b> {new Date().toLocaleDateString()}</Typography>

            <Table sx={{ mt: 2 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Book</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Qty</TableCell>
                  <TableCell>Total</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {cart.map((item, i) => (
                  <TableRow key={i}>
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

            {/* Print Button */}
            <MotionButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              variant="contained"
              sx={{
                mt: 2,
                bgcolor: "#a0522d",
                "&:hover": { bgcolor: "#65350F" },
              }}
              onClick={() => window.print()}
            >
              Print Invoice
            </MotionButton>
          </MotionBox>
        )}
      </Container>
    </MotionBox>
  );
}

export default Billing;