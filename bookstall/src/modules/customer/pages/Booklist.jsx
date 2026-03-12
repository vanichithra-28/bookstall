import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
} from '@mui/material';
import axios from 'axios';

const Booklist = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:3008/books');
        setBooks(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching books:', err);
        setError('Failed to load books. Please try again later.');
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #fff4eb 0%, #fff2e6 100%)',
        minHeight: '100vh',
        pb: 8,
      }}
    >
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box sx={{ mb: 6, textAlign: { xs: 'center', md: 'left' } }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{ fontWeight: 700, color: '#65350F', mb: 1 }}
          >
            Our Books
          </Typography>
          <Typography sx={{ color: '#a0522d', fontSize: '1.1rem' }}>
            Browse and discover your next favorite read
          </Typography>
        </Box>

        {loading ? (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <Typography variant="h6" color="text.secondary">
              Loading books...
            </Typography>
          </Box>
        ) : error ? (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <Typography variant="h6" color="error">
              {error}
            </Typography>
          </Box>
        ) : books.length === 0 ? (
          <Box
            sx={{
              textAlign: 'center',
              py: 10,
              bgcolor: 'rgba(255,255,255,0.4)',
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" sx={{ color: '#a0522d' }}>
              No books available at the moment.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {books.map((book) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={book._id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 2,
                    boxShadow: '0 4px 12px rgba(101, 53, 15, 0.08)',
                    transition: 'all 0.25s ease',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: '0 12px 28px rgba(101, 53, 15, 0.14)',
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="280"
                    image={book.image || 'https://via.placeholder.com/300x420?text=No+Cover'}
                    alt={book.name}
                    sx={{
                      objectFit: 'cover',
                      borderBottom: '1px solid #fff4eb',
                    }}
                  />

                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{
                        fontWeight: 700,
                        color: '#65350F',
                        mb: 1,
                        lineHeight: 1.3,
                      }}
                    >
                      {book.name}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{ color: '#8b5a2b', mb: 1.5 }}
                    >
                      by {book.author}
                    </Typography>

                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mt: 2,
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 700, color: '#65350F' }}
                      >
                        ₹{Number(book.price).toLocaleString()}
                      </Typography>

                      <Chip
                        label={book.category || 'General'}
                        size="small"
                        sx={{
                          bgcolor: '#fff4eb',
                          color: '#a0522d',
                          fontWeight: 600,
                        }}
                      />
                    </Box>
                  </CardContent>

                  <Box sx={{ p: 2, pt: 0 }}>
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        backgroundColor: '#a0522d',
                        '&:hover': { backgroundColor: '#65350F' },
                        py: 1.1,
                        fontWeight: 600,
                      }}
                      // You can later connect this to cart / buy logic
                      onClick={() => alert(`Added "${book.name}" to cart! (feature coming soon)`)}
                    >
                      Add to Cart
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Booklist;