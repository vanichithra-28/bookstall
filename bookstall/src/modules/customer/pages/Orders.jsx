import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Container,
  Grid,
  CardMedia,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

// Floating book decoration component
const FloatingBook = ({ style, delay = 0 }) => (
  <motion.div
    style={{
      position: "absolute",
      fontSize: "2rem",
      opacity: 0.15,
      pointerEvents: "none",
      ...style,
    }}
    animate={{
      y: [0, -15, 0],
      rotate: [0, 5, -5, 0],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    }}
  >
    📦
  </motion.div>
);

// Sparkle effect component
const Sparkle = ({ style, delay = 0 }) => (
  <motion.div
    style={{
      position: "absolute",
      width: "6px",
      height: "6px",
      borderRadius: "50%",
      background: "linear-gradient(135deg, #d4a574, #8b5a2b)",
      pointerEvents: "none",
      ...style,
    }}
    animate={{
      scale: [0, 1, 0],
      opacity: [0, 1, 0],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    }}
  />
);

// Animated background orb
const BackgroundOrb = ({ style, delay = 0 }) => (
  <motion.div
    style={{
      position: "absolute",
      borderRadius: "50%",
      background: "radial-gradient(circle, rgba(212,165,116,0.3) 0%, transparent 70%)",
      pointerEvents: "none",
      filter: "blur(40px)",
      ...style,
    }}
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.5, 0.3],
    }}
    transition={{
      duration: 5,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    }}
  />
);

// Custom loading spinner
const LoadingSpinner = () => (
  <motion.div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "4rem",
      gap: "1.5rem",
    }}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <motion.div
      style={{
        width: "60px",
        height: "60px",
        border: "4px solid rgba(101,53,15,0.1)",
        borderTop: "4px solid #65350F",
        borderRadius: "50%",
      }}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
    <motion.div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        color: "#65350F",
        fontWeight: 600,
      }}
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    >
      <motion.span
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ fontSize: "1.5rem" }}
      >
        📦
      </motion.span>
      Loading your orders...
    </motion.div>
  </motion.div>
);

// Empty state component
const EmptyState = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "4rem 2rem",
      textAlign: "center",
    }}
  >
    <motion.div
      animate={{
        y: [0, -10, 0],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{ fontSize: "5rem", marginBottom: "1.5rem" }}
    >
      📭
    </motion.div>
    <Typography
      variant="h5"
      sx={{ color: "#65350F", fontWeight: 600, mb: 1 }}
    >
      No Orders Yet
    </Typography>
    <Typography sx={{ color: "#8b5a2b", maxWidth: "400px" }}>
      You haven't placed any orders yet. Start exploring our collection and find your next favorite read!
    </Typography>
    <motion.button
      whileHover={{ scale: 1.05, boxShadow: "0 8px 25px rgba(101,53,15,0.25)" }}
      whileTap={{ scale: 0.95 }}
      style={{
        marginTop: "1.5rem",
        padding: "0.75rem 2rem",
        background: "linear-gradient(135deg, #65350F, #8b5a2b)",
        color: "white",
        border: "none",
        borderRadius: "12px",
        fontWeight: 600,
        cursor: "pointer",
        fontSize: "1rem",
      }}
    >
      Browse Books
    </motion.button>
  </motion.div>
);

// Animated order card
const OrderCard = ({ order, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Grid item xs={12} sm={6} md={4}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: index * 0.1,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        whileHover={{ y: -8 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <Card
          sx={{
            borderRadius: 3,
            boxShadow: isHovered
              ? "0 20px 40px rgba(101,53,15,0.2)"
              : "0 6px 18px rgba(101,53,15,0.12)",
            transition: "box-shadow 0.3s ease",
            overflow: "hidden",
            position: "relative",
            background: "white",
          }}
        >
          {/* Shine effect on hover */}
          <motion.div
            style={{
              position: "absolute",
              top: 0,
              left: "-100%",
              width: "100%",
              height: "100%",
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
              pointerEvents: "none",
              zIndex: 10,
            }}
            animate={isHovered ? { left: "100%" } : { left: "-100%" }}
            transition={{ duration: 0.6 }}
          />

          <CardContent sx={{ position: "relative" }}>
            {/* Order header */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <motion.span
                animate={isHovered ? { rotate: [0, 10, -10, 0] } : {}}
                transition={{ duration: 0.5 }}
                style={{ fontSize: "1.5rem" }}
              >
                📦
              </motion.span>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "#65350F" }}
              >
                Order #{order._id.slice(-8)}
              </Typography>
            </Box>

            {/* Status badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
              style={{
                display: "inline-block",
                padding: "4px 12px",
                background: "linear-gradient(135deg, #d4edda, #c3e6cb)",
                borderRadius: "20px",
                marginBottom: "1rem",
              }}
            >
              <Typography sx={{ color: "#155724", fontSize: "0.75rem", fontWeight: 600 }}>
                Completed
              </Typography>
            </motion.div>

            {/* Order items */}
            <AnimatePresence>
              {order.items.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + idx * 0.1 + 0.2 }}
                >
                  <Box sx={{ mt: 2, position: "relative", overflow: "hidden", borderRadius: 2 }}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CardMedia
                        component="img"
                        image={
                          item.image ||
                          "https://via.placeholder.com/200x300?text=No+Cover"
                        }
                        alt={item.bookname}
                        sx={{
                          height: 200,
                          objectFit: "cover",
                          borderRadius: 2,
                          mb: 1,
                        }}
                      />
                    </motion.div>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Typography sx={{ color: "#65350F", fontWeight: 600 }}>
                        {item.bookname}
                      </Typography>
                      <motion.span
                        style={{
                          background: "rgba(101,53,15,0.1)",
                          padding: "2px 8px",
                          borderRadius: "8px",
                          fontSize: "0.875rem",
                          color: "#65350F",
                        }}
                      >
                        × {item.quantity}
                      </motion.span>
                    </Box>
                    <Typography sx={{ color: "#8b5a2b", fontWeight: 500 }}>
                      ₹{Number(item.total_price).toLocaleString()}
                    </Typography>
                  </Box>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: index * 0.1 + 0.4 }}
              style={{
                height: "2px",
                background: "linear-gradient(90deg, transparent, #d4a574, transparent)",
                margin: "1rem 0",
              }}
            />

            {/* Order total */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography sx={{ color: "#65350F", fontWeight: 500 }}>
                Total
              </Typography>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 + 0.5, type: "spring" }}
              >
                <Typography
                  sx={{
                    fontWeight: 700,
                    color: "#65350F",
                    fontSize: "1.25rem",
                    background: "linear-gradient(135deg, #65350F, #8b5a2b)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  ₹{Number(order.totalAmount).toLocaleString()}
                </Typography>
              </motion.div>
            </Box>

            {/* Order date */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 1.5 }}>
              <motion.span
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{ fontSize: "1rem" }}
              >
                🕐
              </motion.span>
              <Typography sx={{ color: "#999", fontSize: "0.875rem" }}>
                {new Date(order.orderdate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </motion.div>
    </Grid>
  );
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) return;

        const res = await axios.get(
          `http://localhost:3008/orders/customer/${user._id}`
        );

        setOrders(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{
        background: "linear-gradient(135deg, #fff4eb 0%, #fff2e6 100%)",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decorations */}
      <BackgroundOrb style={{ top: "10%", right: "-5%", width: "300px", height: "300px" }} delay={0} />
      <BackgroundOrb style={{ bottom: "20%", left: "-10%", width: "400px", height: "400px" }} delay={1.5} />
      
      <FloatingBook style={{ top: "15%", left: "5%" }} delay={0} />
      <FloatingBook style={{ top: "25%", right: "8%" }} delay={0.5} />
      <FloatingBook style={{ bottom: "30%", left: "10%" }} delay={1} />
      <FloatingBook style={{ bottom: "15%", right: "5%" }} delay={1.5} />
      
      <Sparkle style={{ top: "20%", left: "15%" }} delay={0} />
      <Sparkle style={{ top: "40%", right: "20%" }} delay={0.7} />
      <Sparkle style={{ bottom: "25%", left: "25%" }} delay={1.4} />
      <Sparkle style={{ top: "60%", right: "15%" }} delay={2.1} />

      <Container sx={{ py: 4, position: "relative", zIndex: 1 }}>
        {/* Header section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Box sx={{ mb: 6 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
              <motion.span
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ fontSize: "2.5rem" }}
              >
                📋
              </motion.span>
              <Typography
                variant="h3"
                sx={{ fontWeight: 700, color: "#65350F" }}
              >
                Order History
              </Typography>
            </Box>

            {/* Animated underline */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{
                height: "4px",
                background: "linear-gradient(90deg, #65350F, #d4a574, transparent)",
                borderRadius: "2px",
                marginTop: "0.5rem",
                marginBottom: "1rem",
                transformOrigin: "left",
                maxWidth: "300px",
              }}
            />

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Typography sx={{ color: "#a0522d", fontSize: "1.1rem" }}>
                View your previous orders and track your reading journey
              </Typography>
            </motion.div>

            {/* Order count badge */}
            {!loading && orders.length > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6, type: "spring" }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginTop: "1rem",
                  padding: "0.5rem 1rem",
                  background: "rgba(101,53,15,0.1)",
                  borderRadius: "20px",
                }}
              >
                <span style={{ fontSize: "1rem" }}>📊</span>
                <Typography sx={{ color: "#65350F", fontWeight: 600, fontSize: "0.9rem" }}>
                  {orders.length} {orders.length === 1 ? "Order" : "Orders"} Total
                </Typography>
              </motion.div>
            )}
          </Box>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {loading ? (
            <LoadingSpinner key="loading" />
          ) : orders.length === 0 ? (
            <EmptyState key="empty" />
          ) : (
            <motion.div
              key="orders"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Grid container spacing={3}>
                {orders.map((order, index) => (
                  <OrderCard key={order._id} order={order} index={index} />
                ))}
              </Grid>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </motion.div>
  );
};

export default Orders;
