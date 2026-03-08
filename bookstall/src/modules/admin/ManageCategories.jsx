import { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper
} from "@mui/material";

function ManageCategories() {

  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleAddCategory = () => {

    if (categoryName === "") return;

    if (editIndex !== null) {
      const updated = [...categories];
      updated[editIndex] = categoryName;
      setCategories(updated);
      setEditIndex(null);
    } else {
      setCategories([...categories, categoryName]);
    }

    setCategoryName("");
  };

  const handleEdit = (index) => {
    setCategoryName(categories[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updated = categories.filter((_, i) => i !== index);
    setCategories(updated);
  };

  return (
    <Container>

      {/* Stylish Heading */}
      <Typography
        variant="h4"
        align="center"
        sx={{
          fontWeight: "bold",
          marginTop: 3,
          marginBottom: 3,
          color: "#1976d2",
          letterSpacing: 2
        }}
      >
        Manage Categories
      </Typography>

      {/* Add Category */}
      <Paper sx={{ padding: 3, marginBottom: 3 }} elevation={3}>

        <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
          Add Category
        </Typography>

        <TextField
          label="Category Name"
          fullWidth
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />

        <Button
          variant="contained"
          sx={{ marginTop: 2, marginRight: 2 }}
          onClick={handleAddCategory}
        >
          {editIndex !== null ? "Update Category" : "Add Category"}
        </Button>

        <Button
          variant="outlined"
          sx={{ marginTop: 2 }}
          onClick={() => setShowCategories(true)}
        >
          View Categories
        </Button>

      </Paper>

      {/* Categories Table */}
      {showCategories && (

        <Paper elevation={3} sx={{ padding: 2 }}>

          <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
            Category List
          </Typography>

          <Table>

            <TableHead>
              <TableRow>
                <TableCell><b>ID</b></TableCell>
                <TableCell><b>Category Name</b></TableCell>
                <TableCell><b>Actions</b></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>

              {categories.map((cat, index) => (

                <TableRow key={index}>

                  <TableCell>{index + 1}</TableCell>

                  <TableCell>{cat}</TableCell>

                  <TableCell>

                    <Button
                      variant="contained"
                      color="warning"
                      sx={{ marginRight: 1 }}
                      onClick={() => handleEdit(index)}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </Button>

                  </TableCell>

                </TableRow>

              ))}

            </TableBody>

          </Table>

        </Paper>

      )}

    </Container>
  );
}

export default ManageCategories;