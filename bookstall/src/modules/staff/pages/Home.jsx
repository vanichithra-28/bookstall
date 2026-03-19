import React from "react";
import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search02Icon } from "@hugeicons/core-free-icons";


const Home = () => {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #fff4eb 0%, #fff2e6 100%)",
        minHeight: "100vh",
      }}
    >
      <Container sx={{ pt: 4 }}>
        <TextField
          variant="outlined"
          placeholder="Search for books..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <HugeiconsIcon icon={Search02Icon} />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 4, width: "100%" }}
        />
      </Container>
      <Box component="section" sx={{ py: 8 }}>
        <Container sx={{ display: "flex", alignItems: "center", gap: 4 }}>
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h3"
              component="h1"
              sx={{ fontWeight: 700, color: "#65350F", mb: 2 }}
              gutterBottom
            >
              Staff Dashboard
            </Typography>
            <Typography sx={{ color: "#a0522d", mb: 3, fontSize: "1.1rem" }}>
              Welcome back
            </Typography>
            <Box></Box>
          </Box>

          <Box sx={{ width: 360, display: { xs: "none", md: "block" } }}>
            <img
              src="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=900&auto=format&fit=crop&ixlib=rb-4.0.3&s=3b6a1c1d5f4a6b9c2d7e8f9a0b1c2d3e"
              alt="Books"
              style={{ width: "100%", borderRadius: 8 }}
            />
          </Box>
        </Container>
      </Box>

     
    </div>
  );
};

export default Home;
