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
  Zoom,
} from "@mui/material";
import {
  DeleteOutline,
  EditOutlined,
  CategoryOutlined,
  AddCircleOutline,
  ListAltOutlined,
} from "@mui/icons-material";
import axios from "axios";

function ManageCategories() {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(true);
  const [editId, setEditId] = useState(null);

  // Fetch categories function (moved outside useEffect)
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
      fetchCategories(); // refresh list
    } catch (error) {
      alert("Error saving category");
      console.error(error);
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
        fetchCategories(); // refresh list
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #fdf6f0 0%, #fef9f6 100%)",
        minHeight: "100vh",
        pb: 6,
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ py: 6 }}>
          <Typography
            variant="h3"
            sx={{ fontWeight: 700, color: "#65350F", mb: 1 }} // lavender heading
          >
            Manage Categories
          </Typography>
          <Typography sx={{ color: "#5c5c5c", fontSize: "1.1rem" }}>
            Organize your library collection by genre or department
          </Typography>
        </Box>

        {/* Add / Update Form */}
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 2,
            backgroundColor: "rgba(255, 255, 255, 0.6)",
            border: "1px solid #fdf6f0",
            mb: 6,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              mb: 3,
              fontWeight: 600,
              color: "#a0522d",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <CategoryOutlined />
            {editId !== null ? "Update Category Name" : "Create New Category"}
          </Typography>

          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={8}>
              <TextField
                label="Genre / Category Name"
                fullWidth
                variant="outlined"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                sx={{ "& .MuiOutlinedInput-root": { backgroundColor: "#fff" } }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                variant="contained"
                fullWidth
                startIcon={<AddCircleOutline />}
                sx={{
                  py: 1.8,
                  backgroundColor: "#a0522d", // pastel teal
                  "&:hover": { backgroundColor: "#a0522d" },
                  fontWeight: 600,
                }}
                onClick={handleAddCategory}
              >
                {editId !== null ? "Update" : "Add Category"}
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Category List */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: "#a0522d",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <ListAltOutlined /> Category List
          </Typography>
          <Button
            size="small"
            onClick={() => setShowCategories(!showCategories)}
            sx={{ color: "#a0522d", fontWeight: 600 }}
          >
            {showCategories ? "Hide List" : "Show List"}
          </Button>
        </Box>

        {showCategories && (
          <Grid container spacing={2}>
            {categories.map((cat, index) => (
              <Grid item xs={12} sm={6} key={cat._id || index}>
                <Zoom in={true} style={{ transitionDelay: `${index * 50}ms` }}>
                  <Card
                    sx={{
                      borderRadius: 2,
                      border: "1px solid rgba(205, 180, 219, 0.3)", // lavender border
                    }}
                  >
                    <CardContent
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        p: "16px !important",
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                            backgroundColor: "#f8d7da", // blush pink
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "#4a3f35",
                            fontWeight: 800,
                          }}
                        >
                          {index + 1}
                        </Box>
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: 600, color: "#4a3f35" }}
                        >
                          {cat.name}
                        </Typography>
                      </Box>

                      <Box>
                        <Tooltip title="Edit Category">
                          <IconButton
                            onClick={() => handleEdit(cat)}
                            sx={{ color: "#a0522d" }}
                          >
                            <EditOutlined fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Category">
                          <IconButton
                            onClick={() => handleDelete(cat._id)}
                            sx={{ color: "#d32f2f" }}
                          >
                            <DeleteOutline fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </CardContent>
                  </Card>
                </Zoom>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}

export default ManageCategories;