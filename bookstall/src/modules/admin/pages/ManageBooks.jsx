import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  IconButton,
  Box,
  Divider,
  MenuItem,
  Chip,
  Paper
} from "@mui/material";
import axios from "axios";
import { HugeiconsIcon } from "@hugeicons/react";
import { Delete03Icon, Edit02Icon } from "@hugeicons/core-free-icons";

function ManageBooks() {

  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);

  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [bookImage, setBookImage] = useState("");
  const [stock, setStock] = useState("");
  const [editId, setEditId] = useState(null);

  
  useEffect(() => {
    const fetchBooks = async () => {
      const res = await axios.get("http://localhost:3008/books");
      setBooks(Array.isArray(res.data) ? res.data : res.data.data || []);
    };



    const fetchCategories = async () => {
      const res = await axios.get("http://localhost:3008/categories");
      setCategories(res.data);
    };

    fetchBooks();
    fetchCategories();

  }, []);

  const handleAddBook = async () => {

    if (!bookName || !author || !price || !category|| !stock) {
      alert("Fill required fields");
      return;
    }

    const bookData = {
      name: bookName,
      author,
      price: Number(price),
      category,
      image: bookImage || "https://via.placeholder.com/150",
      stock: Number(stock)
    };

    if (editId) {

      await axios.put(`http://localhost:3008/books/${editId}`, bookData);

      setBooks(
        books.map((b) =>
          b._id === editId ? { ...b, ...bookData } : b
        )
      );

      setEditId(null);

    } else {

      const res = await axios.post("http://localhost:3008/books", bookData);

      setBooks([...books, res.data.data]);

    }

    setBookName("");
    setAuthor("");
    setPrice("");
    setCategory("");
    setBookImage("");
    setStock("");
  };

 const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:3008/books/${id}`);
    setBooks(books.filter((b) => b._id !== id && b.id !== id));
  } catch (err) {
    console.error("Delete failed:", err.response?.data || err.message);
    alert("Could not delete book. Check backend route/ID.");
  }
};


  const handleEdit = (book) => {

    setBookName(book.name);
    setAuthor(book.author);
    setPrice(book.price);
    setCategory(book.category);
    setBookImage(book.image);
    setStock(book.stock);
    setEditId(book._id);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getCategoryName = (id) => {
    const cat = categories.find((c) => c._id === id);
    return cat ? cat.name : "Unknown";
  };

  return (

    <Box
      sx={{
        background: "linear-gradient(135deg, #fff4eb 0%, #fff2e6 100%)",
        minHeight: "100vh",
        pb: 8
      }}
    >

      <Container maxWidth="lg" sx={{ py: 6 }}>

        {/* PAGE TITLE */}

        <Box sx={{ mb: 5 }}>
          <Typography
            variant="h3"
            sx={{ fontWeight: 700, color: "#65350F" }}
          >
            Manage Books
          </Typography>

          <Typography sx={{ color: "#a0522d" }}>
            Add or update inventory
          </Typography>
        </Box>

        {/* FORM */}

        <Paper
          sx={{
            p: 4,
            mb: 6,
            borderRadius: 3,
            boxShadow: "0 6px 18px rgba(101,53,15,0.08)"
          }}
        >

          <Typography
            variant="h6"
            sx={{ mb: 3, color: "#65350F", fontWeight: 600 }}
          >
            {editId ? "Update Book" : "Add Book"}
          </Typography>

          <Grid container spacing={3}>

            <Grid item xs={12} md={6}>
              <TextField
                label="Book Title"
                fullWidth
                value={bookName}
                onChange={(e) => setBookName(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Author"
                fullWidth
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                label="Price"
                type="number"
                fullWidth
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                select
                label="Category"
                fullWidth
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <MenuItem key={cat._id} value={cat._id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                label="Image URL"
                fullWidth
                value={bookImage}
                onChange={(e) => setBookImage(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Stock"
                type="number"
                fullWidth
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                onClick={handleAddBook}
                sx={{
                  bgcolor: "#a0522d",
                  "&:hover": { bgcolor: "#65350F" }
                }}
              >
                {editId ? "Update Book" : "Add Book"}
              </Button>
            </Grid>

          </Grid>

        </Paper>

        {/* INVENTORY */}

        <Typography
          variant="h5"
          sx={{ mb: 3, color: "#65350F", fontWeight: 600 }}
        >
          Book Inventory
        </Typography>

        <Grid container spacing={3}>

          {books.map((book) => (

            <Grid item xs={12} sm={6} md={4} lg={3} key={book._id}>

              <Card
                sx={{
                   width: 220,
                 height: "100%",
                  borderRadius: 3,
                  boxShadow: "0 4px 12px rgba(101,53,15,0.08)",
                  transition: "0.25s",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 12px 28px rgba(101,53,15,0.14)"
                  }
                }}
              >

                <Box sx={{ position: "relative", width: "100%", pt: "100%" }}>

                  <img
                    src={book.image}
                    alt={book.name}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover"
                    }}
                  />

                </Box>

                <CardContent>

                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 700, color: "#65350F" }}
                  >
                    {book.name}
                  </Typography>

                  <Typography sx={{ color: "#8b5a2b", mb: 1 }}>
                    {book.author}
                  </Typography>

                  <Typography
                    sx={{ fontWeight: 700, color: "#65350F" }}
                  >
                    ₹{book.price}
                  </Typography>

                  <Chip
                    label={getCategoryName(book.category)}
                    size="small"
                    sx={{
                      mt: 1,
                      bgcolor: "#fff4eb",
                      color: "#a0522d"
                    }}
                  />

                </CardContent>

                <Divider />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    p: 1
                  }}
                >

                  <IconButton
                    onClick={() => handleEdit(book)}
                    sx={{ color: "#a0522d" }}
                  >
                    <HugeiconsIcon icon={Edit02Icon} />
                  </IconButton>

                  <IconButton
                    onClick={() => handleDelete(book._id)}
                    sx={{ color: "#a0522d" }}
                  >
                    <HugeiconsIcon icon={Delete03Icon} />
                  </IconButton>

                </Box>

              </Card>

            </Grid>

          ))}

        </Grid>

      </Container>

    </Box>
  );
}

export default ManageBooks;