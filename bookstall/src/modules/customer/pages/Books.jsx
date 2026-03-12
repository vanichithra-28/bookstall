import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
} from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";

const Booklist = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookRes = await axios.get(`http://localhost:3008/books/${id}`);
        const catRes = await axios.get(`http://localhost:3008/categories`);

        setBook(bookRes.data);
        setCategories(catRes.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching book:", err);
        setError("Failed to load book.");
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const getCategoryName = (catId) => {
    const cat = categories.find((c) => c._id === catId);
    return cat ? cat.name : "Unknown";
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #fff4eb 0%, #fff2e6 100%)",
        minHeight: "100vh",
        pb: 8,
      }}
    >
      <Container maxWidth="md" sx={{ py: 6 }}>
        {loading ? (
          <Typography align="center">Loading book...</Typography>
        ) : error ? (
          <Typography align="center" color="error">
            {error}
          </Typography>
        ) : !book ? (
          <Typography align="center">Book not found</Typography>
        ) : (
          <Card
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              borderRadius: 2,
              boxShadow: "0 6px 18px rgba(101,53,15,0.12)",
            }}
          >
            <CardMedia
              component="img"
              image={
                book.image ||
                "https://via.placeholder.com/300x420?text=No+Cover"
              }
              alt={book.name}
              sx={{
                width: { md: 300 },
                height: { xs: 350, md: "auto" },
                objectFit: "cover",
              }}
            />

            <CardContent sx={{ p: 4 }}>
              <Typography
                variant="h4"
                sx={{ fontWeight: 700, color: "#65350F", mb: 1 }}
              >
                {book.name}
              </Typography>

              <Typography sx={{ color: "#8b5a2b", mb: 2 }}>
                by {book.author}
              </Typography>

              <Chip
                label={getCategoryName(book.category)}
                sx={{
                  bgcolor: "#fff4eb",
                  color: "#a0522d",
                  fontWeight: 600,
                  mb: 2,
                }}
              />

              <Typography
                variant="h5"
                sx={{ fontWeight: 700, color: "#65350F", mb: 3 }}
              >
                ₹{Number(book.price).toLocaleString()}
              </Typography>

              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#a0522d",
                  "&:hover": { backgroundColor: "#65350F" },
                  fontWeight: 600,
                }}
                onClick={() =>
                  alert(`Added "${book.name}" to cart! (feature coming soon)`)
                }
              >
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        )}
      </Container>
    </Box>
  );
};

export default Booklist;