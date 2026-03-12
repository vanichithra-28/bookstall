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
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";

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

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #fff4eb 0%, #fff2e6 100%)",
        minHeight: "100vh",
        pb: 8,
      }}
    >
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box sx={{ mb: 5, textAlign: { xs: "center", md: "left" } }}>
          <Typography
            variant="h3"
            sx={{ fontWeight: 700, color: "#65350F", mb: 1 }}
          >
            Categories
          </Typography>
          <Typography sx={{ color: "#a0522d", fontSize: "1.1rem" }}>
            Explore books by category
          </Typography>
        </Box>

        {loading ? (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <CircularProgress sx={{ color: "#a0522d" }} />
          </Box>
        ) : error ? (
          <Typography color="error" align="center">
            {error}
          </Typography>
        ) : (
          <>
            {/* Category Chips */}
            <Box sx={{ mb: 5 }}>
              <Typography variant="h6" sx={{ mb: 2, color: "#65350F" }}>
                Select a Category
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1.5,
                  justifyContent: { xs: "center", md: "flex-start" },
                }}
              >
                <Chip
                  label="All Books"
                  color={!selectedCategory ? "primary" : "default"}
                  variant={!selectedCategory ? "filled" : "outlined"}
                  onClick={clearFilter}
                  sx={{
                    bgcolor: !selectedCategory ? "#a0522d" : undefined,
                    color: !selectedCategory ? "#fff" : "#a0522d",
                    borderColor: "#a0522d",
                    "&:hover": { bgcolor: "#65350F", color: "#fff" },
                  }}
                />

                {categories.map((cat) => (
                  <Chip
                    key={cat._id}
                    label={cat.name}
                    color={
                      selectedCategory === cat._id ? "primary" : "default"
                    }
                    variant={
                      selectedCategory === cat._id ? "filled" : "outlined"
                    }
                    onClick={() => handleCategoryClick(cat._id)}
                    sx={{
                      bgcolor:
                        selectedCategory === cat._id ? "#a0522d" : undefined,
                      color:
                        selectedCategory === cat._id ? "#fff" : "#a0522d",
                      borderColor: "#a0522d",
                      "&:hover": { bgcolor: "#65350F", color: "#fff" },
                    }}
                  />
                ))}
              </Box>
            </Box>

            {/* Books */}
            <Typography
              variant="h5"
              sx={{ mb: 3, color: "#65350F", fontWeight: 600 }}
            >
              {selectedCategory
                ? `Books in "${selectedCategoryName}"`
                : "All Available Books"}
            </Typography>

            {filteredBooks.length === 0 ? (
              <Box
                sx={{
                  textAlign: "center",
                  py: 8,
                  bgcolor: "rgba(255,255,255,0.4)",
                  borderRadius: 2,
                }}
              >
                <Typography variant="h6" sx={{ color: "#a0522d" }}>
                  No books found{" "}
                  {selectedCategory ? `in "${selectedCategoryName}"` : ""}
                </Typography>
              </Box>
            ) : (
              <Grid container spacing={3}>
                {filteredBooks.map((book) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={book._id}>
                    <Card
                      sx={{
                        height: "100%",
                        borderRadius: 2,
                        boxShadow: "0 4px 12px rgba(101,53,15,0.08)",
                        transition: "0.25s",
                        "&:hover": {
                          transform: "translateY(-6px)",
                          boxShadow: "0 12px 28px rgba(101,53,15,0.14)",
                        },
                      }}
                    >
                      <CardActionArea
                        onClick={() => navigate(`/customer/books/${book._id}`)}
                        sx={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Box
                          sx={{
                            position: "relative",
                            width: "100%",
                            pt: "130%",
                          }}
                        >
                          <img
                            src={
                              book.image ||
                              "https://via.placeholder.com/300x390?text=No+Cover"
                            }
                            alt={book.name}
                            style={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              borderBottom: "1px solid #fff4eb",
                            }}
                          />
                        </Box>

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
                            <Typography
                              variant="h6"
                              sx={{ fontWeight: 700, color: "#65350F" }}
                            >
                              ₹{Number(book.price).toLocaleString()}
                            </Typography>

                            <Chip
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
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </>
        )}
      </Container>
    </Box>
  );
};

export default Category;