import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Motion components
const MotionBox = motion.create(Box);
const MotionCard = motion.create(Card);
const MotionButton = motion.create(Button);
const MotionTypography = motion.create(Typography);

// Floating book decoration component
const FloatingBook = ({ delay = 0, left, top, size = 24, rotation = 15 }) => (
  <MotionBox
    initial={{ opacity: 0, y: 20 }}
    animate={{ 
      opacity: [0.15, 0.25, 0.15],
      y: [0, -15, 0],
      rotate: [rotation, rotation + 5, rotation]
    }}
    transition={{
      duration: 4,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    sx={{
      position: 'absolute',
      left,
      top,
      pointerEvents: 'none',
      zIndex: 0,
    }}
  >
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#8b5a2b" strokeWidth="1.5">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  </MotionBox>
);

// Sparkle component
const Sparkle = ({ delay = 0, left, top, size = 8 }) => (
  <MotionBox
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      rotate: [0, 180, 360]
    }}
    transition={{
      duration: 2,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    sx={{
      position: 'absolute',
      left,
      top,
      pointerEvents: 'none',
      zIndex: 0,
    }}
  >
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#a0522d">
      <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
    </svg>
  </MotionBox>
);

// Checkout icon component
const CheckoutIcon = () => (
  <MotionBox
    initial={{ scale: 0, rotate: -180 }}
    animate={{ scale: 1, rotate: 0 }}
    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
    sx={{ display: 'inline-flex', mr: 1.5, verticalAlign: 'middle' }}
  >
    <motion.svg 
      width="36" 
      height="36" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="#65350F" 
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </motion.svg>
  </MotionBox>
);

// Empty cart icon
const EmptyCartIcon = () => (
  <MotionBox
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ type: "spring", stiffness: 200, damping: 15 }}
    sx={{ mb: 3 }}
  >
    <motion.svg 
      width="80" 
      height="80" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="#a0522d" 
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={{ 
        y: [0, -10, 0],
        rotate: [0, 5, -5, 0]
      }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      <line x1="10" y1="11" x2="16" y2="11" />
    </motion.svg>
  </MotionBox>
);

// Credit card icon
const CreditCardIcon = () => (
  <motion.svg 
    width="28" 
    height="28" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="#65350F" 
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ type: "spring", delay: 0.3 }}
  >
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </motion.svg>
);

const Checkout = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    name: "",
    cvv: "",
  });
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const subtotal = cartItems.reduce((sum, item) => sum + item.total_price, 0);

  const handleOpenPopup = () => {
    setOpen(true);
  };

  const handleClosePopup = () => {
    setOpen(false);
    setErrors({});
  };

  const validatePayment = () => {
    let tempErrors = {};

    const cardRegex = /^[0-9]{16}$/;
    if (!paymentDetails.cardNumber) {
      tempErrors.cardNumber = "Card number is required";
    } else if (!cardRegex.test(paymentDetails.cardNumber)) {
      tempErrors.cardNumber = "Card number must be 16 digits";
    }

    if (!paymentDetails.name.trim()) {
      tempErrors.name = "Name on card is required";
    } else if (paymentDetails.name.length < 3) {
      tempErrors.name = "Name must be at least 3 characters";
    }

    const cvvRegex = /^[0-9]{3}$/;
    if (!paymentDetails.cvv) {
      tempErrors.cvv = "CVV is required";
    } else if (!cvvRegex.test(paymentDetails.cvv)) {
      tempErrors.cvv = "CVV must be 3 digits";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (!validatePayment()) return;

    setIsProcessing(true);

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const customerid = user._id;

      const res = await axios.post("http://localhost:3008/orders", {
        customerid,
        items: cartItems,
        totalAmount: subtotal,
        payment: paymentDetails,
      });

      alert(`Order placed successfully! Order ID: ${res.data.order._id}`);

      localStorage.removeItem("cart");
      setCartItems([]);

      navigate("/orders");
    } catch (err) {
      console.error("Order error:", err);
      alert("Failed to place order");
    } finally {
      setIsProcessing(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    },
    exit: { 
      opacity: 0, 
      x: 30,
      transition: { duration: 0.2 }
    }
  };

  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      sx={{
        background: "linear-gradient(135deg, #fff4eb 0%, #fff2e6 100%)",
        minHeight: "100vh",
        py: 5,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Floating decorations */}
      <FloatingBook delay={0} left="5%" top="10%" size={28} rotation={-15} />
      <FloatingBook delay={0.5} left="90%" top="15%" size={22} rotation={20} />
      <FloatingBook delay={1} left="85%" top="60%" size={26} rotation={-10} />
      <FloatingBook delay={1.5} left="8%" top="70%" size={24} rotation={25} />
      
      <Sparkle delay={0.3} left="15%" top="20%" size={10} />
      <Sparkle delay={0.8} left="80%" top="30%" size={8} />
      <Sparkle delay={1.3} left="75%" top="75%" size={12} />
      <Sparkle delay={1.8} left="20%" top="85%" size={9} />

      {/* Background orbs */}
      <MotionBox
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        sx={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, #a0522d 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <MotionBox
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.08, 0.12, 0.08],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        sx={{
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          width: 250,
          height: 250,
          borderRadius: '50%',
          background: 'radial-gradient(circle, #65350F 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <Container sx={{ py: 4, position: 'relative', zIndex: 1 }}>
        {/* Animated Header */}
        <MotionBox
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          sx={{ mb: 4 }}
        >
          <Typography
            variant="h4"
            sx={{ 
              fontWeight: 700, 
              color: "#65350F", 
              mb: 1,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <CheckoutIcon />
            Checkout
          </Typography>
          
          {/* Animated underline */}
          <MotionBox
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            sx={{
              height: 4,
              width: 120,
              background: 'linear-gradient(90deg, #a0522d, #65350F)',
              borderRadius: 2,
              transformOrigin: 'left',
            }}
          />
        </MotionBox>

        {cartItems.length === 0 ? (
          <MotionBox
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            sx={{ 
              textAlign: 'center', 
              mt: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <EmptyCartIcon />
            <MotionTypography 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              sx={{ color: "#8b5a2b", fontSize: '1.2rem' }}
            >
              Your cart is empty.
            </MotionTypography>
            <MotionButton
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              variant="contained"
              onClick={() => navigate('/category')}
              sx={{
                mt: 3,
                backgroundColor: "#a0522d",
                "&:hover": { backgroundColor: "#65350F" },
                fontWeight: 600,
              }}
            >
              Continue Shopping
            </MotionButton>
          </MotionBox>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <AnimatePresence mode="popLayout">
                {cartItems.map((item, index) => (
                  <Grid item xs={12} key={item._id}>
                    <MotionCard
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      layout
                      whileHover={{ 
                        scale: 1.02, 
                        boxShadow: "0 12px 30px rgba(101,53,15,0.2)",
                        y: -4,
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      sx={{
                        borderRadius: 3,
                        boxShadow: "0 6px 18px rgba(101,53,15,0.12)",
                        background: 'linear-gradient(135deg, #ffffff 0%, #fffaf5 100%)',
                        overflow: 'hidden',
                        position: 'relative',
                      }}
                    >
                      {/* Shine overlay */}
                      <MotionBox
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '200%' }}
                        transition={{ duration: 0.6 }}
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '50%',
                          height: '100%',
                          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                          pointerEvents: 'none',
                        }}
                      />
                      <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <MotionBox
                            initial={{ rotate: -10 }}
                            animate={{ rotate: 0 }}
                            transition={{ delay: index * 0.1 }}
                            sx={{
                              width: 48,
                              height: 48,
                              borderRadius: 2,
                              background: 'linear-gradient(135deg, #a0522d 0%, #65350F 100%)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                            </svg>
                          </MotionBox>
                          <Box>
                            <Typography sx={{ fontWeight: 600, color: "#65350F", fontSize: '1.1rem' }}>
                              {item.bookname}
                            </Typography>
                            <Typography sx={{ color: "#8b5a2b", fontSize: '0.9rem' }}>
                              Quantity: {item.quantity}
                            </Typography>
                          </Box>
                        </Box>
                        <MotionTypography 
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          sx={{ 
                            fontWeight: 700, 
                            color: "#a0522d",
                            fontSize: '1.2rem',
                          }}
                        >
                          Rs.{Number(item.total_price).toLocaleString()}
                        </MotionTypography>
                      </CardContent>
                    </MotionCard>
                  </Grid>
                ))}
              </AnimatePresence>
            </Grid>

            {/* Subtotal Section */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              sx={{ 
                mb: 3, 
                p: 3, 
                borderRadius: 3,
                background: 'linear-gradient(135deg, #ffffff 0%, #fffaf5 100%)',
                boxShadow: "0 6px 18px rgba(101,53,15,0.12)",
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: "#65350F" }}>
                  Order Summary
                </Typography>
                <MotionTypography
                  variant="h5"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  key={subtotal}
                  sx={{ fontWeight: 700, color: "#a0522d" }}
                >
                  Rs.{subtotal.toLocaleString()}
                </MotionTypography>
              </Box>
            </MotionBox>

            {/* Place Order Button */}
            <MotionButton
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, type: "spring" }}
              whileHover={{ 
                scale: 1.03, 
                boxShadow: "0 8px 25px rgba(160,82,45,0.4)",
              }}
              whileTap={{ scale: 0.97 }}
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#a0522d",
                "&:hover": { backgroundColor: "#65350F" },
                fontWeight: 600,
                py: 1.8,
                fontSize: '1.1rem',
                borderRadius: 3,
                position: 'relative',
                overflow: 'hidden',
              }}
              onClick={handleOpenPopup}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                Place Order
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </Box>
            </MotionButton>

            {/* Payment Dialog */}
            <Dialog 
              open={open} 
              onClose={handleClosePopup}
              PaperProps={{
                component: motion.div,
                initial: { opacity: 0, scale: 0.9, y: 20 },
                animate: { opacity: 1, scale: 1, y: 0 },
                exit: { opacity: 0, scale: 0.9, y: 20 },
                transition: { type: "spring", stiffness: 300, damping: 25 },
                sx: {
                  borderRadius: 4,
                  background: 'linear-gradient(135deg, #ffffff 0%, #fffaf5 100%)',
                  minWidth: 400,
                }
              }}
            >
              <DialogTitle sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1.5,
                color: "#65350F",
                fontWeight: 700,
              }}>
                <CreditCardIcon />
                Confirm Payment
              </DialogTitle>
              <DialogContent>
                <MotionBox
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  sx={{ 
                    mb: 3, 
                    p: 2, 
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #a0522d 0%, #65350F 100%)',
                  }}
                >
                  <Typography sx={{ color: '#fff', fontWeight: 500 }}>
                    Total Amount
                  </Typography>
                  <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '1.5rem' }}>
                    Rs.{subtotal.toLocaleString()}
                  </Typography>
                </MotionBox>
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <TextField
                    label="Card Number"
                    fullWidth
                    margin="dense"
                    value={paymentDetails.cardNumber}
                    onChange={(e) =>
                      setPaymentDetails({
                        ...paymentDetails,
                        cardNumber: e.target.value,
                      })
                    }
                    error={!!errors.cardNumber}
                    helperText={errors.cardNumber}
                    placeholder="1234 5678 9012 3456"
                    inputProps={{ maxLength: 16 }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': { borderColor: '#a0522d' },
                        '&.Mui-focused fieldset': { borderColor: '#65350F' },
                      },
                    }}
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <TextField
                    label="Name on Card"
                    fullWidth
                    margin="dense"
                    value={paymentDetails.name}
                    onChange={(e) =>
                      setPaymentDetails({
                        ...paymentDetails,
                        name: e.target.value,
                      })
                    }
                    error={!!errors.name}
                    helperText={errors.name}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': { borderColor: '#a0522d' },
                        '&.Mui-focused fieldset': { borderColor: '#65350F' },
                      },
                    }}
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <TextField
                    label="CVV"
                    type="password"
                    fullWidth
                    margin="dense"
                    value={paymentDetails.cvv}
                    onChange={(e) =>
                      setPaymentDetails({
                        ...paymentDetails,
                        cvv: e.target.value,
                      })
                    }
                    error={!!errors.cvv}
                    helperText={errors.cvv}
                    inputProps={{ maxLength: 3 }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': { borderColor: '#a0522d' },
                        '&.Mui-focused fieldset': { borderColor: '#65350F' },
                      },
                    }}
                  />
                </motion.div>
              </DialogContent>
              <DialogActions sx={{ p: 3, pt: 1 }}>
                <MotionButton
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleClosePopup}
                  sx={{ color: '#8b5a2b' }}
                >
                  Cancel
                </MotionButton>
                <MotionButton
                  whileHover={{ 
                    scale: 1.03,
                    boxShadow: "0 6px 20px rgba(160,82,45,0.4)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  variant="contained"
                  disabled={isProcessing}
                  sx={{ 
                    backgroundColor: "#a0522d",
                    "&:hover": { backgroundColor: "#65350F" },
                    fontWeight: 600,
                    px: 4,
                    borderRadius: 2,
                  }}
                  onClick={handlePlaceOrder}
                >
                  {isProcessing ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        style={{ display: 'inline-flex' }}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                        </svg>
                      </motion.span>
                      Processing...
                    </Box>
                  ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      Pay & Place Order
                      <motion.span
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </Box>
                  )}
                </MotionButton>
              </DialogActions>
            </Dialog>
          </motion.div>
        )}
      </Container>
    </MotionBox>
  );
};

export default Checkout;
