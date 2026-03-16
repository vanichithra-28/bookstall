import { Box, Button, Container, TextField, Typography } from "@mui/material";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const MotionBox = motion(Box);
const MotionTypography = motion(Typography);
const MotionButton = motion(Button);

// Floating book decoration component
const FloatingBook = ({ delay, x, y, rotation, size = 40 }) => (
  <motion.div
    style={{
      position: "absolute",
      left: x,
      top: y,
      opacity: 0.15,
      pointerEvents: "none",
    }}
    initial={{ opacity: 0, scale: 0, rotate: rotation - 20 }}
    animate={{ 
      opacity: 0.15, 
      scale: 1, 
      rotate: rotation,
      y: [0, -10, 0],
    }}
    transition={{
      opacity: { delay, duration: 0.5 },
      scale: { delay, duration: 0.5, type: "spring" },
      rotate: { delay, duration: 0.5 },
      y: { delay: delay + 0.5, duration: 3, repeat: Infinity, ease: "easeInOut" },
    }}
  >
    <svg width={size} height={size * 1.2} viewBox="0 0 40 48" fill="none">
      <rect x="4" y="2" width="32" height="44" rx="2" fill="#65350F" />
      <rect x="8" y="6" width="24" height="36" rx="1" fill="#a0522d" />
      <rect x="12" y="12" width="16" height="2" rx="1" fill="#fff4eb" />
      <rect x="12" y="18" width="12" height="2" rx="1" fill="#fff4eb" />
      <rect x="12" y="24" width="14" height="2" rx="1" fill="#fff4eb" />
    </svg>
  </motion.div>
);

// Animated input wrapper
const AnimatedTextField = ({ delay, error, ...props }) => (
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.5, type: "spring", stiffness: 100 }}
  >
    <motion.div
      whileFocus={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <TextField
        fullWidth
        variant="standard"
        error={!!error}
        helperText={error}
        sx={{
          mt: 3,
          "& .MuiInput-underline:before": {
            borderBottomColor: "#d4a574",
          },
          "& .MuiInput-underline:hover:before": {
            borderBottomColor: "#a0522d",
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: "#F18966",
          },
          "& .MuiInputLabel-root": {
            color: "#a0522d",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#65350F",
          },
          "& .MuiInputBase-input": {
            color: "#65350F",
          },
        }}
        {...props}
      />
    </motion.div>
  </motion.div>
);

// Sparkle animation component
const Sparkle = ({ delay, x, y }) => (
  <motion.div
    style={{
      position: "absolute",
      left: x,
      top: y,
      pointerEvents: "none",
    }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      rotate: [0, 180, 360],
    }}
    transition={{
      delay,
      duration: 2,
      repeat: Infinity,
      repeatDelay: 3,
    }}
  >
    <svg width="12" height="12" viewBox="0 0 24 24" fill="#F18966">
      <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
    </svg>
  </motion.div>
);

const Login = ({ onLogin }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    let tempErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!inputs.email) {
      tempErrors.email = "Email is required";
    } else if (!emailRegex.test(inputs.email)) {
      tempErrors.email = "Invalid email format";
    }

    if (!inputs.password) {
      tempErrors.password = "Password is required";
    } else if (inputs.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const signinHandler = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3008/customers/login",
        inputs
      );
      const { success, user, message } = response.data;

      if (success) {
        localStorage.setItem("customerId", user._id);
        localStorage.setItem("role", user.role);
        localStorage.setItem("user", JSON.stringify(user));
        onLogin(user.role);
        alert(message || "Login successful!");
        navigate("/");
      } else {
        alert(message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert(error.response?.data?.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{
        background: "linear-gradient(135deg, #fff4eb 0%, #fff2e6 100%)",
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Floating decorative books */}
      <FloatingBook delay={0.3} x="5%" y="15%" rotation={-15} size={35} />
      <FloatingBook delay={0.5} x="85%" y="20%" rotation={12} size={45} />
      <FloatingBook delay={0.7} x="10%" y="70%" rotation={8} size={40} />
      <FloatingBook delay={0.9} x="90%" y="65%" rotation={-10} size={38} />
      
      {/* Sparkles */}
      <Sparkle delay={1} x="15%" y="30%" />
      <Sparkle delay={2} x="80%" y="40%" />
      <Sparkle delay={1.5} x="20%" y="75%" />
      <Sparkle delay={2.5} x="75%" y="80%" />

      {/* Background gradient orbs */}
      <motion.div
        style={{
          position: "absolute",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(241,137,102,0.1) 0%, transparent 70%)",
          left: "-100px",
          top: "-50px",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        style={{
          position: "absolute",
          width: 250,
          height: 250,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(101,53,15,0.08) 0%, transparent 70%)",
          right: "-80px",
          bottom: "-80px",
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1 }}>
        <MotionBox
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          sx={{ mt: 2 }}
        >
          {/* Header Section */}
          <Box sx={{ textAlign: "center", mb: 5 }}>
            {/* Animated book icon */}
            <motion.div
              initial={{ opacity: 0, y: -30, rotateY: -90 }}
              animate={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ 
                duration: 0.8, 
                type: "spring",
                stiffness: 100,
              }}
              style={{ marginBottom: 16 }}
            >
              <motion.svg
                width="60"
                height="60"
                viewBox="0 0 60 60"
                fill="none"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.rect
                  x="10"
                  y="8"
                  width="40"
                  height="44"
                  rx="3"
                  fill="#65350F"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                />
                <rect x="15" y="13" width="30" height="34" rx="2" fill="#a0522d" />
                <motion.rect
                  x="20"
                  y="20"
                  width="20"
                  height="3"
                  rx="1.5"
                  fill="#fff4eb"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                />
                <motion.rect
                  x="20"
                  y="28"
                  width="15"
                  height="3"
                  rx="1.5"
                  fill="#fff4eb"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.6, duration: 0.3 }}
                />
                <motion.rect
                  x="20"
                  y="36"
                  width="18"
                  height="3"
                  rx="1.5"
                  fill="#fff4eb"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.7, duration: 0.3 }}
                />
              </motion.svg>
            </motion.div>

            <MotionTypography
              variant="h3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
              sx={{ fontWeight: 700, color: "#65350F", mb: 1 }}
            >
              Welcome Back
            </MotionTypography>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Typography sx={{ color: "#a0522d", fontSize: "1rem" }}>
                Sign in to your bookstall account
              </Typography>
            </motion.div>
          </Box>

          {/* Form Fields */}
          <AnimatedTextField
            delay={0.6}
            name="email"
            label="Email"
            onChange={inputHandler}
            value={inputs.email}
            error={errors.email}
            
          />

          <AnimatedTextField
            delay={0.7}
            name="password"
            label="Password"
            type="password"
            onChange={inputHandler}
            value={inputs.password}
            error={errors.password}
           
          />

          {/* Login Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <MotionButton
              fullWidth
              variant="contained"
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 10px 30px rgba(241, 137, 102, 0.4)",
              }}
              whileTap={{ scale: 0.98 }}
              sx={{
                mt: 5,
                py: 1.5,
                backgroundColor: "#F18966",
                color: "#fff",
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: 600,
                borderRadius: 2,
                boxShadow: "0 4px 15px rgba(241, 137, 102, 0.3)",
                position: "relative",
                overflow: "hidden",
                "&:hover": {
                  backgroundColor: "#e07850",
                },
                "&:disabled": {
                  backgroundColor: "#d4a574",
                  color: "#fff",
                },
              }}
              onClick={signinHandler}
              disabled={loading}
            >
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      style={{
                        width: 20,
                        height: 20,
                        border: "2px solid transparent",
                        borderTopColor: "#fff",
                        borderRadius: "50%",
                      }}
                    />
                    Logging in...
                  </motion.div>
                ) : (
                  <motion.span
                    key="login"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Login
                  </motion.span>
                )}
              </AnimatePresence>
            </MotionButton>
          </motion.div>

          {/* Register Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <Typography sx={{ mt: 4, textAlign: "center", color: "#666" }}>
              Don't have an account?{" "}
              <motion.span
                whileHover={{ scale: 1.05 }}
                style={{ display: "inline-block" }}
              >
                <Link
                  to="/register"
                  style={{
                    color: "#F18966",
                    fontWeight: 600,
                    textDecoration: "none",
                    cursor: "pointer",
                    position: "relative",
                  }}
                >
                  <motion.span
                    whileHover={{ 
                      textDecoration: "underline",
                      color: "#a0522d",
                    }}
                  >
                    Register here
                  </motion.span>
                </Link>
              </motion.span>
            </Typography>
          </motion.div>

          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            style={{
              height: 2,
              background: "linear-gradient(90deg, transparent, #d4a574, transparent)",
              marginTop: 32,
              borderRadius: 1,
            }}
          />
        </MotionBox>
      </Container>
    </motion.div>
  );
};

export default Login;
