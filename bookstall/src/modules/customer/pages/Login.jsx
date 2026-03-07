import { Box, Button, Container, TextField, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });
  const inputHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate()
  const signinHandler = () => {
    axios.post("http://localhost:3008/",{
      email: inputs.email,
      password: inputs.password
    })
    // Implement your login logic here
    alert("Login successful");
    navigate("/");
  }
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #fff4eb 0%, #fff2e6 100%)",
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="sm">
        <Box sx={{ mt: 2 }}>
          <Box sx={{ textAlign: "center", mb: 5 }}>
            <Typography variant="h3" sx={{ fontWeight: 700, color: "#65350F", mb: 1 }}>
              Welcome Back
            </Typography>
            <Typography sx={{ color: "#a0522d", fontSize: "1rem" }}>
              Sign in to your bookstall account
            </Typography>
          </Box>

          <TextField
            fullWidth
            name="email"
            label="Email"
            variant="standard"
            sx={{ mt: 3 }}
            onChange={inputHandler}
            value={inputs.email}
          />
          <TextField
            fullWidth
            name="password"
            label="Password"
            type="password"
            variant="standard"
            sx={{ mt: 3 }}
            onChange={inputHandler}
            value={inputs.password}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 5,
              py: 1.2,
              backgroundColor: "#F18966",
              color: "#fff",
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: 600,
              borderRadius: 1,
              "&:hover": {
                backgroundColor: "#a0522d",
              },
            }}
            onClick={signinHandler}
          >
            Login
          </Button>

          <Typography sx={{ mt: 4, textAlign: "center", color: "#666" }}>
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{
                color: "#F18966",
                fontWeight: 600,
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              Register here
            </Link>
          </Typography>
        </Box>
      </Container>
    </div>
  );
};

export default Login;
