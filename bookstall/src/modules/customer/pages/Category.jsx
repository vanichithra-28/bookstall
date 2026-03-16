import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  CircularProgress,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";

const MotionBox = motion.create(Box);
const MotionCard = motion.create(Card);
const MotionChip = motion.create(Chip);
const MotionTypography = motion.create(Typography);

const FloatingBook = ({ delay, x, y, rotation }) => (
  <MotionBox
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0.1, 0.2, 0.1],
      scale: 1,
      y: [0, -15, 0],
      rotate: [rotation, rotation + 5, rotation],
    }}
    transition={{
      opacity: { duration: 3, repeat: Infinity, delay },
      y: { duration: 4, repeat: Infinity, delay, ease: "easeInOut" },
      rotate: { duration: 5, repeat: Infinity, delay, ease: "easeInOut" },
      scale: { duration: 0.5, delay },
    }}
    sx={{
      position: "absolute",
      left: x,
      top: y,
      width: 40,
      height: 50,
      background: "linear-gradient(135deg, #a0522d 0%, #65350F 100%)",
      borderRadius: "2px 6px 6px 2px",
      boxShadow: "2px 2px 8px rgba(101,53,15,0.2)",
      pointerEvents: "none",
      zIndex: 0,
      "&::before": {
        content: '""',
        position: "absolute",
        left: 3,
        top: 0,
        bottom: 0,
        width: 2,
        background: "rgba(255,255,255,0.3)",
      },
    }}
  />
);

const Sparkle = ({ delay, x, y }) => (
  <MotionBox
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0, 1, 0],
      scale: [0.5, 1, 0.5],
      rotate: [0, 180, 360],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    }}
    sx={{
      position: "absolute",
      left: x,
      top: y,
      width: 8,
      height: 8,
      pointerEvents: "none",
      zIndex: 0,
      "&::before, &::after": {
        content: '""',
        position: "absolute",
        background: "#a0522d",
      },
      "&::before": {
        left: 3,
        top: 0,
        width: 2,
        height: 8,
        borderRadius: 1,
      },
      "&::after": {
        left: 0,
        top: 3,
        width: 8,
        height: 2,
        borderRadius: 1,
      },
    }}
  />
);

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const selectedCategory = searchParams.get("category") || null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const catRes = await axios.get("http://localhost:3008/categories");
        setCategories(catRes.data);

        const booksRes = await axios.get("http://localhost:3008/books");
        setBooks(booksRes.data);

        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load data. Please try again.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCategoryClick = (catId) => {
    if (selectedCategory === catId) {
      setSearchParams({});
    } else {
      setSearchParams({ category: catId });
    }
  };

  const clearFilter = () => {
    setSearchParams({});
  };

  const filteredBooks = selectedCategory
    ? books.filter((book) => book.category === selectedCategory)
    : books;

  const getCategoryName = (id) => {
    const cat = categories.find((c) => c._id === id);
    return cat ? cat.name : "Unknown";
  };

  const selectedCategoryName = categories.find(
    (c) => c._id === selectedCategory
  )?.name;

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

  // const itemVariants = {
  //   hidden: { opacity: 0, y: 20 },
  //   visible: {
  //     opacity: 1,
  //     y: 0,
  //     transition: {
  //       type: "spring",
  //       stiffness: 100,
  //       damping: 12,
  //     },
  //   },
  // };

  const chipVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
    tap: { scale: 0.95 },
    hover: { 
      scale: 1.05,
      boxShadow: "0 4px 12px rgba(101,53,15,0.2)",
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
    hover: {
      y: -8,
      scale: 1.02,
      boxShadow: "0 20px 40px rgba(101,53,15,0.18)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
    tap: { scale: 0.98 },
  };

  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      sx={{
        background: "linear-gradient(135deg, #fff4eb 0%, #fff2e6 100%)",
        minHeight: "100vh",
        pb: 8,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Floating decorations */}
      <FloatingBook delay={0} x="5%" y="15%" rotation={-15} />
      <FloatingBook delay={0.5} x="92%" y="20%" rotation={10} />
      <FloatingBook delay={1} x="88%" y="60%" rotation={-8} />
      <FloatingBook delay={1.5} x="3%" y="70%" rotation={12} />
      
      <Sparkle delay={0.2} x="15%" y="25%" />
      <Sparkle delay={0.7} x="85%" y="35%" />
      <Sparkle delay={1.2} x="10%" y="55%" />
      <Sparkle delay={1.7} x="90%" y="75%" />

      {/* Animated background orbs */}
      <MotionBox
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        sx={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(160,82,45,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <MotionBox
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        sx={{
          position: "absolute",
          bottom: -150,
          left: -150,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(101,53,15,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="lg" sx={{ py: 6, position: "relative", zIndex: 1 }}>
        {/* Header */}
        <MotionBox
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          sx={{ mb: 5, textAlign: { xs: "center", md: "left" } }}
        >
          <Box sx={{ position: "relative", display: "inline-block" }}>
            <MotionTypography
              variant="h3"
              sx={{ fontWeight: 700, color: "#65350F", mb: 1 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Categories
            </MotionTypography>
            
            {/* Animated underline */}
            <MotionBox
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
              sx={{
                position: "absolute",
                bottom: -4,
                left: 0,
                width: "60%",
                height: 4,
                background: "linear-gradient(90deg, #a0522d, #65350F)",
                borderRadius: 2,
                transformOrigin: "left",
              }}
            />
          </Box>
          
          <MotionTypography
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            sx={{ color: "#a0522d", fontSize: "1.1rem", mt: 2 }}
          >
            Explore books by category
          </MotionTypography>
        </MotionBox>

        {loading ? (
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            sx={{ textAlign: "center", py: 8 }}
          >
            <MotionBox
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              sx={{ display: "inline-block" }}
            >
              <CircularProgress sx={{ color: "#a0522d" }} />
            </MotionBox>
            <MotionTypography
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              sx={{ mt: 2, color: "#a0522d" }}
            >
              Loading books...
            </MotionTypography>
          </MotionBox>
        ) : error ? (
          <MotionBox
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Typography color="error" align="center">
              {error}
            </Typography>
          </MotionBox>
        ) : (
          <>
            {/* Category Chips */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              sx={{ mb: 5 }}
            >
              <Typography variant="h6" sx={{ mb: 2, color: "#65350F" }}>
                Select a Category
              </Typography>

              <MotionBox
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1.5,
                  justifyContent: { xs: "center", md: "flex-start" },
                }}
              >
                <MotionChip
                  variants={chipVariants}
                  whileHover="hover"
                  whileTap="tap"
                  label="All Books"
                  color={!selectedCategory ? "primary" : "default"}
                  variant={!selectedCategory ? "filled" : "outlined"}
                  onClick={clearFilter}
                  sx={{
                    bgcolor: !selectedCategory ? "#a0522d" : undefined,
                    color: !selectedCategory ? "#fff" : "#a0522d",
                    borderColor: "#a0522d",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    "&:hover": { bgcolor: "#65350F", color: "#fff" },
                  }}
                />

                {categories.map((cat, index) => (
                  <MotionChip
                    key={cat._id}
                    variants={chipVariants}
                    whileHover="hover"
                    whileTap="tap"
                    custom={index}
                    label={cat.name}
                    color={selectedCategory === cat._id ? "primary" : "default"}
                    variant={selectedCategory === cat._id ? "filled" : "outlined"}
                    onClick={() => handleCategoryClick(cat._id)}
                    sx={{
                      bgcolor: selectedCategory === cat._id ? "#a0522d" : undefined,
                      color: selectedCategory === cat._id ? "#fff" : "#a0522d",
                      borderColor: "#a0522d",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      "&:hover": { bgcolor: "#65350F", color: "#fff" },
                    }}
                  />
                ))}
              </MotionBox>
            </MotionBox>

            {/* Books Section Title */}
            <MotionBox
              key={selectedCategory || "all"}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Typography
                variant="h5"
                sx={{ mb: 3, color: "#65350F", fontWeight: 600 }}
              >
                {selectedCategory
                  ? `Books in "${selectedCategoryName}"`
                  : "All Available Books"}
              </Typography>
            </MotionBox>

            {/* Books Grid */}
            <AnimatePresence mode="wait">
              {filteredBooks.length === 0 ? (
                <MotionBox
                  key="empty"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  sx={{
                    textAlign: "center",
                    py: 8,
                    bgcolor: "rgba(255,255,255,0.4)",
                    borderRadius: 2,
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <MotionBox
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Typography variant="h6" sx={{ color: "#a0522d" }}>
                      No books found{" "}
                      {selectedCategory ? `in "${selectedCategoryName}"` : ""}
                    </Typography>
                  </MotionBox>
                </MotionBox>
              ) : (
                <MotionBox
                  key={selectedCategory || "all-books"}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0 }}
                >
                  <Grid container spacing={3}>
                    {filteredBooks.map((book, index) => (
                      <Grid item xs={12} sm={6} md={4} lg={3} key={book._id}>
                        <MotionCard
                          variants={cardVariants}
                          whileHover="hover"
                          whileTap="tap"
                          custom={index}
                          layout
                          sx={{
                            width: 220,
                            height: "100%",
                            borderRadius: 2,
                            boxShadow: "0 4px 12px rgba(101,53,15,0.08)",
                            overflow: "hidden",
                            background: "rgba(255,255,255,0.9)",
                            backdropFilter: "blur(10px)",
                          }}
                        >
                          <CardActionArea
                            onClick={() => navigate(`/customer/books/${book._id}`)}
                            sx={{
                              height: "100%",
                              display: "grid",
                              flexDirection: "column",
                            }}
                          >
                            <MotionBox
                              sx={{
                                position: "relative",
                                width: "100%",
                                height: 250,
                                overflow: "hidden",
                                borderBottom: "1px solid #fff4eb",
                              }}
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.3 }}
                            >
                              <motion.img
                                initial={{ scale: 1.1, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                src={
                                  book.image ||
                                  "https://via.placeholder.com/300x390?text=No+Cover"
                                }
                                alt={book.name}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />
                              
                              {/* Hover overlay */}
                              <MotionBox
                                initial={{ opacity: 0 }}
                                whileHover={{ opacity: 1 }}
                                transition={{ duration: 0.2 }}
                                sx={{
                                  position: "absolute",
                                  inset: 0,
                                  background: "linear-gradient(to top, rgba(101,53,15,0.6) 0%, transparent 50%)",
                                  display: "flex",
                                  alignItems: "flex-end",
                                  justifyContent: "center",
                                  pb: 2,
                                }}
                              >
                                <Typography
                                  sx={{
                                    color: "#fff",
                                    fontWeight: 600,
                                    fontSize: "0.9rem",
                                  }}
                                >
                                  View Details
                                </Typography>
                              </MotionBox>
                            </MotionBox>

                            <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
                              <Typography
                                variant="subtitle1"
                                sx={{ fontWeight: 700, color: "#65350F", mb: 0.5 }}
                              >
                                {book.name}
                              </Typography>

                              <Typography
                                variant="body2"
                                sx={{ color: "#8b5a2b", mb: 1.5 }}
                              >
                                {book.author}
                              </Typography>

                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <MotionTypography
                                  variant="h6"
                                  sx={{ fontWeight: 700, color: "#65350F" }}
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 0.2 + index * 0.05 }}
                                >
                                  ₹{Number(book.price).toLocaleString()}
                                </MotionTypography>

                                <MotionChip
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: 0.3 + index * 0.05 }}
                                  whileHover={{ scale: 1.1 }}
                                  label={getCategoryName(book.category)}
                                  size="small"
                                  sx={{
                                    mt: 1,
                                    bgcolor: "#fff4eb",
                                    color: "#a0522d",
                                  }}
                                />
                              </Box>
                            </CardContent>
                          </CardActionArea>
                        </MotionCard>
                      </Grid>
                    ))}
                  </Grid>
                </MotionBox>
              )}
            </AnimatePresence>
          </>
        )}
      </Container>
    </MotionBox>
  );
};

export default Category;