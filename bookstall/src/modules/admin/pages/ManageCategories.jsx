import React, {   useEffect, useState } from "react";
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

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3008/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

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
      alert("Error saving category");
      console.error(error);
    }
  };

  const handleEdit = (category) => {
    // FIX: Expecting the whole category object, not an index
    setCategoryName(category.name);
    setEditId(category._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    // FIX: Expecting _id from MongoDB
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
    <Box
      sx={{
        background: "linear-gradient(135deg, #fff4eb 0%, #fff2e6 100%)",
        minHeight: "100vh",
        pb: 8,
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ py: 6 }}>
          <Typography
            variant="h3"
            sx={{ fontWeight: 700, color: "#65350F", mb: 1 }}
          >
            Manage Categories
          </Typography>
          <Typography sx={{ color: "#a0522d", fontSize: "1.1rem" }}>
            Organize your library collection by genre or department
          </Typography>
        </Box>

        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 2,
            backgroundColor: "rgba(255, 255, 255, 0.6)",
            border: "1px solid #fff4eb",
            mb: 6,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              mb: 3,
              fontWeight: 600,
              color: "#65350F",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <CategoryOutlined />{" "}
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
                  backgroundColor: "#a0522d",
                  "&:hover": { backgroundColor: "#65350F" },
                }}
                onClick={handleAddCategory}
              >
                {editId !== null ? "Update" : "Add Category"}
              </Button>
            </Grid>
          </Grid>
        </Paper>

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
              color: "#65350F",
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
              // FIX: Use cat._id for key
              <Grid item xs={12} sm={6} key={cat._id || index}>
                <Zoom in={true} style={{ transitionDelay: `${index * 50}ms` }}>
                  <Card
                    sx={{
                      borderRadius: 2,
                      border: "1px solid rgba(255, 244, 235, 0.8)",
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
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                            backgroundColor: "#fff4eb",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "#a0522d",
                            fontWeight: 800,
                          }}
                        >
                          {index + 1}
                        </Box>
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: 600, color: "#65350F" }}
                        >
                          {/* FIX: Access cat.name instead of just cat */}
                          {cat.name}
                        </Typography>
                      </Box>

                      <Box>
                        <Tooltip title="Edit Category">
                          {/* FIX: Pass the whole object 'cat' to handleEdit */}
                          <IconButton
                            onClick={() => handleEdit(cat)}
                            sx={{ color: "#a0522d" }}
                          >
                            <EditOutlined fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Category">
                          {/* FIX: Pass cat._id to handleDelete */}
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
