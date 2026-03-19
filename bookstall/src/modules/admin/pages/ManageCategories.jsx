import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Card,
  CardContent,
  IconButton,
  Box,
  Tooltip,
} from "@mui/material";
import {
  DeleteOutline,
  EditOutlined,
  CategoryOutlined,
  AddCircleOutline,
  ListAltOutlined,
} from "@mui/icons-material";
import axios from "axios";
import { motion } from "framer-motion";

/* Motion wrappers */
const MotionBox = motion.create(Box);
const MotionCard = motion.create(Card);
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

function ManageCategories() {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(true);
  const [editId, setEditId] = useState(null);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3008/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    
  }, []);

  const handleAddCategory = async () => {
    if (categoryName.trim() === "") return;

    try {
      if (editId !== null) {
        await axios.put(`http://localhost:3008/categories/${editId}`, {
          name: categoryName,
        });
        setEditId(null);
      } else {
        await axios.post("http://localhost:3008/categories", {
          name: categoryName,
        });
      }

      setCategoryName("");
      fetchCategories();
    } catch (error) {
      console.error("Error saving category:", error);
      alert("Error saving category");
    }
  };

  const handleEdit = (category) => {
    setCategoryName(category.name);
    setEditId(category._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await axios.delete(`http://localhost:3008/categories/${id}`);
        fetchCategories();
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      sx={{
        background: "linear-gradient(135deg, #fff4eb 0%, #fff2e6 100%)",
        minHeight: "100vh",
        pb: 6,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Floating Books */}
      <FloatingBook delay={0} x="5%" y="15%" rotation={-15} />
      <FloatingBook delay={0.5} x="92%" y="20%" rotation={10} />
      <FloatingBook delay={1} x="88%" y="70%" rotation={-10} />

      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
        
        {/* Header */}
        <MotionBox
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          sx={{ py: 6 }}
        >
          <MotionTypography
            variant="h3"
            sx={{ fontWeight: 700, color: "#65350F", mb: 1 }}
          >
            Manage Categories
          </MotionTypography>

          <Typography sx={{ color: "#a0522d" }}>
            Organize your library collection by genre
          </Typography>
        </MotionBox>

        {/* Form */}
        <MotionBox initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Paper
            sx={{
              p: 4,
              mb: 6,
              borderRadius: 3,
              background: "rgba(255,255,255,0.9)",
              backdropFilter: "blur(10px)",
            }}
          >
            <Typography
              variant="h6"
              sx={{ mb: 3, fontWeight: 600, color: "#a0522d" }}
            >
              <CategoryOutlined />{" "}
              {editId !== null ? "Update Category" : "Add Category"}
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={8}>
                <TextField
                  fullWidth
                  label="Category Name"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<AddCircleOutline />}
                  onClick={handleAddCategory}
                  sx={{
                    bgcolor: "#a0522d",
                    "&:hover": { bgcolor: "#65350F" },
                    height: "56px",
                  }}
                >
                  {editId !== null ? "Update" : "Add"}
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </MotionBox>

        {/* List Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Typography variant="h5" sx={{ color: "#65350F", fontWeight: 700 }}>
            <ListAltOutlined /> Category List
          </Typography>

          <Button onClick={() => setShowCategories(!showCategories)}>
            {showCategories ? "Hide" : "Show"}
          </Button>
        </Box>

        {/* Category Cards */}
        {showCategories && (
          <Grid container spacing={2}>
            {categories.map((cat, index) => (
              <Grid item xs={12} sm={6} key={cat._id}>
                <MotionCard
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  sx={{
                    borderRadius: 3,
                    background: "rgba(255,255,255,0.9)",
                  }}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography sx={{ fontWeight: 600 }}>
                      {cat.name}
                    </Typography>

                    <Box>
                      <Tooltip title="Edit">
                        <IconButton onClick={() => handleEdit(cat)}>
                          <EditOutlined />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Delete">
                        <IconButton onClick={() => handleDelete(cat._id)}>
                          <DeleteOutline />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </CardContent>
                </MotionCard>
              </Grid>
            ))}
          </Grid>
        )}

      </Container>
    </MotionBox>
  );
}

export default ManageCategories;