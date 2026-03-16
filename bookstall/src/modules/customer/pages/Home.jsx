import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Skeleton,
} from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";

const Home = ({ onView }) => {
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await axios.get("http://localhost:3008/books/featured/list");
        setFeaturedBooks(res.data);
      } catch (err) {
        console.error("Error fetching featured books:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #fff4eb 0%, #fff2e6 100%)",
        minHeight: "100vh",
      }}
    >
      {/* 🔥 Top Banner */}
      <Box
        sx={{
          bgcolor: "#65350F",
          color: "#fff",
          py: 3,
          px: 2,
          textAlign: "center",
          boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: 700, mb: 1, fontFamily: "Playfair Display, serif" }}
        >
          📚 Special Book Offers
        </Typography>
        <Typography sx={{ fontSize: "1rem", mb: 2 }}>
          Enjoy up to <strong>50% OFF</strong> on bestsellers and limited‑time
          deals. Don’t miss out on your next favorite read!
        </Typography>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#fff",
            color: "#65350F",
            fontWeight: 700,
            "&:hover": { bgcolor: "#f5deb3" },
          }}
        >
          Explore Deals
        </Button>
      </Box>

      {/* Hero Section */}
      <Box component="section" sx={{ py: 8 }}>
        <Container sx={{ display: "flex", alignItems: "center", gap: 4 }}>
          <Box sx={{ flex: 1 }}>
            <Typography
              component={motion.h1}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              variant="h3"
              sx={{
                fontWeight: 700,
                color: "#65350F",
                mb: 2,
                fontFamily: "Playfair Display, serif",
              }}
              gutterBottom
            >
              Find your next favorite book
            </Typography>
            <Typography
              component={motion.p}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              sx={{
                color: "#a0522d",
                mb: 3,
                fontSize: "1.1rem",
                fontStyle: "italic",
              }}
            >
              Curated picks, new releases and timeless classics — discover
              stories that stay with you.
            </Typography>
          </Box>

          <Box
            component={motion.div}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            sx={{ width: 360, display: { xs: "none", md: "block" } }}
          >
            <img
              src="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=900&auto=format&fit=crop&ixlib=rb-4.0.3"
              alt="Books"
              style={{
                width: "100%",
                borderRadius: 12,
                boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
              }}
            />
          </Box>
        </Container>
      </Box>

      {/* Featured Books Section */}
      <Container sx={{ py: 6 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 600, color: "#65350F", mb: 3 }}
          gutterBottom
        >
          Featured Books
        </Typography>

        {loading ? (
          <Grid container spacing={4}>
            {[...Array(4)].map((_, i) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                <Skeleton variant="rectangular" height={240} />
                <Skeleton width="80%" />
                <Skeleton width="60%" />
              </Grid>
            ))}
          </Grid>
        ) : featuredBooks.length === 0 ? (
          <Box
            sx={{
              p: 6,
              textAlign: "center",
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
          >
            <Typography sx={{ color: "#666", fontFamily: "Mea Culpa, sans-serif" }}>
              No featured books yet. Add books from your database to populate
              this section.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={4}>
            {featuredBooks.map((book) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={book._id}>
                <Card
                  sx={{
                    position: "relative",
                    borderRadius: 3,
                    boxShadow: "0 6px 18px rgba(101,53,15,0.12)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: "0 12px 24px rgba(101,53,15,0.2)",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="240"
                    image={book.image || "https://placehold.co/240x360?text=No+Image"}
                    alt={book.title}
                  />
                  {/* Hover Overlay */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      bgcolor: "rgba(0,0,0,0.4)",
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      "&:hover": { opacity: 1 },
                    }}
                  >
                    <Button
                      variant="contained"
                      sx={{ bgcolor: "#fff", color: "#65350F", fontWeight: 600 }}
                      onClick={() => onView(book._id)}
                    >
                      View Details
                    </Button>
                  </Box>
                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 600, color: "#65350F", mb: 1 }}
                    >
                      {book.title}
                    </Typography>
                    <Typography
                      sx={{ color: "#8b5a2b", mb: 1, fontStyle: "italic" }}
                    >
                      {book.author}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </div>
  );
};

export default Home;