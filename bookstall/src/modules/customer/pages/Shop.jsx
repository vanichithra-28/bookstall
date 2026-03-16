

import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

// Floating book decoration component
const FloatingBook = ({ delay = 0, left, top, size = 24 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ 
      opacity: [0.15, 0.3, 0.15],
      y: [0, -15, 0],
      rotate: [-5, 5, -5]
    }}
    transition={{
      duration: 4,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    style={{
      position: "absolute",
      left,
      top,
      pointerEvents: "none",
      zIndex: 0,
    }}
  >
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#a0522d" strokeWidth="1.5">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  </motion.div>
);

// Sparkle component
const Sparkle = ({ delay = 0, left, top }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      rotate: [0, 180, 360]
    }}
    transition={{
      duration: 2.5,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    style={{
      position: "absolute",
      left,
      top,
      pointerEvents: "none",
      zIndex: 0,
    }}
  >
    <svg width="12" height="12" viewBox="0 0 24 24" fill="#d4a574">
      <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
    </svg>
  </motion.div>
);

// Animated background orb
const BackgroundOrb = ({ color, size, left, top, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ 
      opacity: [0.1, 0.2, 0.1],
      scale: [0.8, 1.1, 0.8],
    }}
    transition={{
      duration: 6,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    style={{
      position: "absolute",
      left,
      top,
      width: size,
      height: size,
      borderRadius: "50%",
      background: color,
      filter: "blur(60px)",
      pointerEvents: "none",
      zIndex: 0,
    }}
  />
);

// Custom loading spinner
const LoadingSpinner = () => (
  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", py: 8 }}>
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
    >
      <ShoppingCartIcon sx={{ fontSize: 48, color: "#a0522d" }} />
    </motion.div>
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    >
      <Typography sx={{ mt: 2, color: "#8b5a2b", fontWeight: 500 }}>
        Loading your cart...
      </Typography>
    </motion.div>
  </Box>
);

// Empty cart component
const EmptyCart = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    <Box sx={{ textAlign: "center", py: 8 }}>
      <motion.div
        animate={{ 
          y: [0, -10, 0],
          rotate: [-5, 5, -5]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <RemoveShoppingCartIcon sx={{ fontSize: 80, color: "#d4a574", mb: 2 }} />
      </motion.div>
      <Typography variant="h5" sx={{ color: "#65350F", fontWeight: 600, mb: 1 }}>
        Your cart is empty
      </Typography>
      <Typography sx={{ color: "#8b5a2b" }}>
        Looks like you haven&apos;t added any books yet. Start exploring!
      </Typography>
    </Box>
  </motion.div>
);

// Animated cart item card
const CartItemCard = ({ item, index, onDelete, onQuantityChange }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    setTimeout(() => onDelete(item._id), 300);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ 
        opacity: isDeleting ? 0 : 1, 
        y: isDeleting ? -20 : 0, 
        scale: isDeleting ? 0.8 : 1 
      }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{ height: "100%" }}
    >
      <Card
        component={motion.div}
        animate={{
          y: isHovered ? -8 : 0,
          boxShadow: isHovered 
            ? "0 20px 40px rgba(101,53,15,0.2)" 
            : "0 6px 18px rgba(101,53,15,0.12)"
        }}
        transition={{ duration: 0.3 }}
        sx={{
          width: "100%",
          maxWidth: "280px",
          height: "100%",
          borderRadius: 3,
          overflow: "hidden",
          position: "relative",
          background: "linear-gradient(145deg, #ffffff 0%, #fef9f5 100%)",
          border: "1px solid rgba(160, 82, 45, 0.1)",
        }}
      >
        {/* Shine effect on hover */}
        <motion.div
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ 
            x: isHovered ? "200%" : "-100%",
            opacity: isHovered ? 0.3 : 0
          }}
          transition={{ duration: 0.6 }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "50%",
            height: "100%",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)",
            zIndex: 10,
            pointerEvents: "none",
          }}
        />

        {/* Image container with overlay */}
        <Box sx={{ position: "relative", overflow: "hidden" }}>
          <CardMedia
            component={motion.img}
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.4 }}
            image={item.image || "https://via.placeholder.com/200x300?text=No+Cover"}
            alt={item.bookname}
            sx={{ height: 220, objectFit: "cover" }}
          />
          
          {/* Gradient overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "50%",
              background: "linear-gradient(transparent, rgba(101,53,15,0.7))",
              pointerEvents: "none",
            }}
          />
        </Box>

        <CardContent sx={{ p: 2.5 }}>
          <Typography
            variant="h6"
            sx={{ 
              fontWeight: 700, 
              color: "#65350F",
              fontSize: "1rem",
              mb: 2,
              lineHeight: 1.3,
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {item.bookname}
          </Typography>

          {/* Quantity controls */}
          <Box sx={{ 
            display: "flex", 
            alignItems: "center", 
            mb: 2,
            backgroundColor: "rgba(160, 82, 45, 0.08)",
            borderRadius: 2,
            p: 0.5,
          }}>
            <IconButton
              component={motion.button}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              size="small"
              onClick={() => onQuantityChange(item._id, item.quantity - 1)}
              disabled={item.quantity <= 1}
              sx={{ color: "#a0522d" }}
            >
              <RemoveIcon fontSize="small" />
            </IconButton>
            
            <TextField
              type="number"
              size="small"
              value={item.quantity}
              onChange={(e) => onQuantityChange(item._id, parseInt(e.target.value))}
              inputProps={{ 
                min: 1, 
                style: { 
                  textAlign: "center", 
                  fontWeight: 600,
                  color: "#65350F"
                } 
              }}
              sx={{ 
                width: 60,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { border: "none" },
                }
              }}
            />
            
            <IconButton
              component={motion.button}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              size="small"
              onClick={() => onQuantityChange(item._id, item.quantity + 1)}
              sx={{ color: "#a0522d" }}
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* Price and delete */}
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <motion.div
              key={item.total_price}
              initial={{ scale: 1.2, color: "#a0522d" }}
              animate={{ scale: 1, color: "#65350F" }}
              transition={{ duration: 0.3 }}
            >
              <Typography sx={{ fontWeight: 800, fontSize: "1.25rem" }}>
                ₹{Number(item.total_price).toLocaleString()}
              </Typography>
            </motion.div>

            <IconButton
              component={motion.button}
              whileHover={{ scale: 1.15, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleDelete}
              sx={{ 
                color: "#e57373",
                backgroundColor: "rgba(229, 115, 115, 0.1)",
                "&:hover": {
                  backgroundColor: "rgba(229, 115, 115, 0.2)",
                }
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const Shop = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const res = await axios.get(
          `http://localhost:3008/cart/customer/${user._id}`
        );
        setCartItems(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3008/cart/${id}`);
      setCartItems(cartItems.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  const handleQuantityChange = async (id, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      const res = await axios.put(`http://localhost:3008/cart/${id}`, {
        quantity: newQuantity,
      });
      setCartItems(
        cartItems.map((item) =>
          item._id === id ? { ...item, quantity: res.data.quantity, total_price: res.data.total_price } : item
        )
      );
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  const totalAmount = cartItems.reduce((sum, item) => sum + Number(item.total_price), 0);

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #fff4eb 0%, #fff2e6 100%)",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decorations */}
      <BackgroundOrb color="rgba(160, 82, 45, 0.15)" size="300px" left="-100px" top="10%" delay={0} />
      <BackgroundOrb color="rgba(212, 165, 116, 0.2)" size="250px" left="80%" top="60%" delay={2} />
      <BackgroundOrb color="rgba(101, 53, 15, 0.1)" size="200px" left="60%" top="5%" delay={1} />

      {/* Floating books */}
      <FloatingBook delay={0} left="5%" top="15%" size={28} />
      <FloatingBook delay={0.5} left="92%" top="25%" size={22} />
      <FloatingBook delay={1} left="10%" top="70%" size={20} />
      <FloatingBook delay={1.5} left="88%" top="75%" size={26} />

      {/* Sparkles */}
      <Sparkle delay={0} left="15%" top="20%" />
      <Sparkle delay={0.8} left="85%" top="30%" />
      <Sparkle delay={1.6} left="20%" top="80%" />
      <Sparkle delay={2.4} left="75%" top="65%" />

      <Container sx={{ py: 5, position: "relative", zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
        >
          <Box sx={{ mb: 6 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
              <motion.div
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <ShoppingCartIcon sx={{ fontSize: 40, color: "#a0522d" }} />
              </motion.div>
              <Typography
                variant="h3"
                component="h2"
                sx={{ 
                  fontWeight: 800, 
                  color: "#65350F",
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                Shopping Cart
              </Typography>
            </Box>
            
            {/* Animated underline */}
            <motion.div
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{
                height: "4px",
                background: "linear-gradient(90deg, #a0522d, #d4a574, transparent)",
                borderRadius: "2px",
                marginBottom: "12px",
                maxWidth: "300px",
              }}
            />
            
            <Typography sx={{ color: "#a0522d", fontSize: "1.1rem" }}>
              Review your selected books before checkout
            </Typography>
          </Box>
        </motion.div>

        {/* Content */}
        {loading ? (
          <LoadingSpinner />
        ) : cartItems.length === 0 ? (
          <EmptyCart />
        ) : (
          <>
            <AnimatePresence mode="popLayout">
              <Grid container spacing={3}>
                {cartItems.map((item, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
                    <CartItemCard
                  
                      item={item}
                      index={index}
                      onDelete={handleDelete}
                      onQuantityChange={handleQuantityChange}
                    />
                  </Grid>
                ))}
              </Grid>
            </AnimatePresence>

            {/* Cart summary and checkout */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Box
                sx={{
                  mt: 6,
                  p: 4,
                  borderRadius: 3,
                  background: "linear-gradient(145deg, #ffffff 0%, #fef9f5 100%)",
                  boxShadow: "0 10px 40px rgba(101,53,15,0.15)",
                  border: "1px solid rgba(160, 82, 45, 0.1)",
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: { xs: "stretch", sm: "center" },
                  justifyContent: "space-between",
                  gap: 3,
                }}
              >
                <Box>
                  <Typography sx={{ color: "#8b5a2b", mb: 0.5 }}>
                    Total ({cartItems.length} {cartItems.length === 1 ? "item" : "items"})
                  </Typography>
                  <motion.div
                    key={totalAmount}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: 800, color: "#65350F" }}
                    >
                      ₹{totalAmount.toLocaleString()}
                    </Typography>
                  </motion.div>
                </Box>

                <Button
                  component={motion.button}
                  whileHover={{ 
                    scale: 1.03,
                    boxShadow: "0 8px 30px rgba(160, 82, 45, 0.4)"
                  }}
                  whileTap={{ scale: 0.97 }}
                  variant="contained"
                  onClick={() => navigate("/customer/checkout")}
                  sx={{
                    py: 1.5,
                    px: 5,
                    backgroundColor: "#a0522d",
                    color: "#fff",
                    textTransform: "none",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    borderRadius: 2,
                    position: "relative",
                    overflow: "hidden",
                    "&:hover": { backgroundColor: "#8b4726" },
                  }}
                >
                  <motion.span
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    style={{ display: "flex", alignItems: "center", gap: "8px" }}
                  >
                    Proceed to Checkout
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </motion.span>
                </Button>
              </Box>
            </motion.div>
          </>
        )}
      </Container>
    </Box>
  );
};

export default Shop;
