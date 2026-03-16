import { Box, Button, Container, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const FloatingBook = ({ delay, x, y, rotation }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0.3, 0.6, 0.3],
      scale: [0.8, 1, 0.8],
      rotate: [rotation - 10, rotation + 10, rotation - 10],
      y: [y, y - 20, y]
    }}
    transition={{
      duration: 4,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    style={{
      position: "absolute",
      left: x,
      top: y,
      fontSize: "2rem",
      pointerEvents: "none",
      zIndex: 0
    }}
  >
    📖
  </motion.div>
);

const Sparkle = ({ delay, x, y }) => (
  <motion.div
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
    style={{
      position: "absolute",
      left: x,
      top: y,
      color: "#F18966",
      fontSize: "1rem",
      pointerEvents: "none"
    }}
  >
    ✦
  </motion.div>
);

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    phonenumber: "",
    password: "",
    confirmpwd: "",
    role: "customer",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    let tempErrors = {};

    if (!inputs.username.trim()) {
      tempErrors.username = "Username is required";
    } else if (inputs.username.length < 3) {
      tempErrors.username = "Username must be at least 3 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!inputs.email) {
      tempErrors.email = "Email is required";
    } else if (!emailRegex.test(inputs.email)) {
      tempErrors.email = "Invalid email format";
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!inputs.phonenumber) {
      tempErrors.phonenumber = "Phone number is required";
    } else if (!phoneRegex.test(inputs.phonenumber)) {
      tempErrors.phonenumber = "Phone number must be 10 digits";
    }

    if (!inputs.password) {
      tempErrors.password = "Password is required";
    } else if (inputs.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters";
    }

    if (!inputs.confirmpwd) {
      tempErrors.confirmpwd = "Confirm password is required";
    } else if (inputs.password !== inputs.confirmpwd) {
      tempErrors.confirmpwd = "Passwords do not match";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const submitHandler = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const payload = {
        username: inputs.username,
        email: inputs.email,
        phonenumber: inputs.phonenumber,
        password: inputs.password,
        role: "customer",
      };

      const response = await axios.post(
        "http://localhost:3008/customers/register",
        payload
      );
      alert(response.data.message || "Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

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
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.1
      }
    }
  };

  const formFields = [
    { name: "username", label: "Username", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "phonenumber", label: "Phone Number", type: "text" },
    { name: "password", label: "Password", type: "password" },
    { name: "confirmpwd", label: "Confirm Password", type: "password" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{
        background: "linear-gradient(135deg, #fff4eb 0%, #fff2e6 100%)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Floating decorations */}
      <FloatingBook delay={0} x="5%" y="10%" rotation={-15} />
      <FloatingBook delay={0.5} x="90%" y="15%" rotation={20} />
      <FloatingBook delay={1} x="8%" y="80%" rotation={10} />
      <FloatingBook delay={1.5} x="85%" y="75%" rotation={-20} />
      <FloatingBook delay={2} x="50%" y="5%" rotation={5} />
      
      <Sparkle delay={0.3} x="15%" y="25%" />
      <Sparkle delay={0.8} x="80%" y="30%" />
      <Sparkle delay={1.3} x="20%" y="70%" />
      <Sparkle delay={1.8} x="75%" y="85%" />
      <Sparkle delay={2.3} x="45%" y="90%" />

      {/* Animated background orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(241,137,102,0.2) 0%, transparent 70%)",
          top: "-100px",
          right: "-100px",
          pointerEvents: "none"
        }}
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(101,53,15,0.1) 0%, transparent 70%)",
          bottom: "-50px",
          left: "-50px",
          pointerEvents: "none"
        }}
      />

      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Box
            sx={{
              mt: 1,
              background: "rgba(255, 255, 255, 0.85)",
              backdropFilter: "blur(10px)",
              borderRadius: 4,
              p: { xs: 3, sm: 5 },
              boxShadow: "0 20px 60px rgba(101, 53, 15, 0.15)"
            }}
            component={motion.div}
            whileHover={{ boxShadow: "0 25px 70px rgba(101, 53, 15, 0.2)" }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <motion.div variants={headerVariants} initial="hidden" animate="visible">
              <Box sx={{ textAlign: "center", mb: 4 }}>
                <motion.div
                  animate={{ 
                    rotate: [0, -5, 5, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{ 
                    display: "inline-block",
                    marginBottom: "16px"
                  }}
                >
                  <Box
                    sx={{
                      width: 70,
                      height: 70,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #F18966 0%, #e67850 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto",
                      boxShadow: "0 8px 25px rgba(241, 137, 102, 0.4)"
                    }}
                  >
                    <motion.span
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      style={{ fontSize: "2rem" }}
                    >
                      📝
                    </motion.span>
                  </Box>
                </motion.div>
                
                <Typography
                  variant="h3"
                  sx={{ fontWeight: 700, color: "#65350F", mb: 1 }}
                  component={motion.h3}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Join Us
                </Typography>
                <Typography 
                  sx={{ color: "#a0522d", fontSize: "1rem" }}
                  component={motion.p}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Create your bookstall account
                </Typography>

                {/* Animated underline */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
                  style={{
                    height: "3px",
                    background: "linear-gradient(90deg, transparent, #F18966, transparent)",
                    marginTop: "16px",
                    borderRadius: "2px"
                  }}
                />
              </Box>
            </motion.div>

            {/* Form Fields */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {formFields.map((field, index) => (
                <motion.div
                  key={field.name}
                  variants={itemVariants}
                  whileFocus={{ scale: 1.01 }}
                >
                  <motion.div
                    animate={{
                      x: focusedField === field.name ? 5 : 0,
                      transition: { type: "spring", stiffness: 300 }
                    }}
                  >
                    <TextField
                      fullWidth
                      name={field.name}
                      label={field.label}
                      type={field.type}
                      variant="standard"
                      sx={{
                        mt: index === 0 ? 2 : 3,
                        "& .MuiInput-underline:before": {
                          borderBottomColor: "#ddd"
                        },
                        "& .MuiInput-underline:hover:before": {
                          borderBottomColor: "#F18966"
                        },
                        "& .MuiInput-underline:after": {
                          borderBottomColor: "#F18966"
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "#F18966"
                        }
                      }}
                      onChange={inputHandler}
                      onFocus={() => setFocusedField(field.name)}
                      onBlur={() => setFocusedField(null)}
                      value={inputs[field.name]}
                      error={!!errors[field.name]}
                      helperText={errors[field.name]}
                    />
                  </motion.div>
                  
                  {/* Error shake animation */}
                  <AnimatePresence>
                    {errors[field.name] && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                      />
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}

              {/* Register Button */}
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  fullWidth
                  variant="contained"
                  disabled={isLoading}
                  sx={{
                    mt: 4,
                    py: 1.5,
                    backgroundColor: "#F18966",
                    color: "#fff",
                    textTransform: "none",
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    borderRadius: 2,
                    boxShadow: "0 8px 25px rgba(241, 137, 102, 0.4)",
                    position: "relative",
                    overflow: "hidden",
                    "&:hover": {
                      backgroundColor: "#e67850",
                      boxShadow: "0 12px 35px rgba(241, 137, 102, 0.5)"
                    },
                    "&:disabled": {
                      backgroundColor: "#F18966",
                      color: "#fff"
                    }
                  }}
                  onClick={submitHandler}
                  component={motion.button}
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      style={{ display: "flex", alignItems: "center", gap: "8px" }}
                    >
                      <Box
                        sx={{
                          width: 20,
                          height: 20,
                          border: "2px solid transparent",
                          borderTopColor: "#fff",
                          borderRadius: "50%"
                        }}
                      />
                      Creating Account...
                    </motion.div>
                  ) : (
                    <>
                      Register
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        style={{ marginLeft: "8px" }}
                      >
                        →
                      </motion.span>
                    </>
                  )}

                  {/* Button shine effect */}
                  <motion.div
                    animate={{
                      x: ["-100%", "200%"]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3,
                      ease: "easeInOut"
                    }}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "50%",
                      height: "100%",
                      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                      pointerEvents: "none"
                    }}
                  />
                </Button>
              </motion.div>

              {/* Login Link */}
              <motion.div
                variants={itemVariants}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Typography sx={{ mt: 4, textAlign: "center", color: "#666" }}>
                  Already registered?{" "}
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    style={{ display: "inline-block" }}
                  >
                    <Link
                      to="/login"
                      style={{
                        color: "#F18966",
                        fontWeight: 600,
                        textDecoration: "none",
                        cursor: "pointer",
                        position: "relative"
                      }}
                    >
                      <motion.span
                        whileHover={{
                          textShadow: "0 0 8px rgba(241, 137, 102, 0.5)"
                        }}
                      >
                        Login here
                      </motion.span>
                    </Link>
                  </motion.span>
                </Typography>
              </motion.div>
            </motion.div>
          </Box>
        </motion.div>
      </Container>
    </motion.div>
  );
};

export default Register;
