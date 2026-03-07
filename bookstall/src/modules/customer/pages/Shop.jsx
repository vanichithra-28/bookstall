import { Container, Grid, Typography, Box, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Shop = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #fff4eb 0%, #fff2e6 100%)",
        minHeight: "100vh",
        py: 5,
      }}
    >
      <Container sx={{ py: 4 }}>
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h3"
            component="h2"
            sx={{ fontWeight: 700, color: "#65350F", mb: 1 }}
          >
            Shopping Cart
          </Typography>
          <Typography sx={{ color: "#a0522d", fontSize: "1.1rem" }}>
            Review your selected books before checkout
          </Typography>
        </Box>

        <Grid container spacing={3}></Grid>
        <Button
          variant="contained"
          sx={{
            mt: 5,
            py: 1.2,
            backgroundColor: "#a0522d",
            color: "#fff",
            textTransform: "none",
            fontSize: "1rem",
            fontWeight: 600,
            borderRadius: 1,
            "&:hover": {
              backgroundColor: "#a0522d",
            },
          }}
          onClick={() => navigate("/checkout")}
        >
          Checkout
        </Button>
      </Container>
    </div>
  );
};

export default Shop;
