import { Box, Button, Container, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    phonenumber: "",
    password: "",
    confirmpwd: "",
    role: "customer"   // ← default role for registration

   
  });
  const navigate = useNavigate();
  const inputHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    console.log(inputs);
  };

  // In submitHandler

const submitHandler = async () => {
  if (inputs.password !== inputs.confirmpwd) {
    alert("Passwords do not match!");
    return;
  }

  try {
    const payload = {
      username: inputs.username,
      email: inputs.email,
      phonenumber: inputs.phonenumber,
      password: inputs.password,
      role: "customer"          // ← force customer role here
    };

const response = await axios.post("http://localhost:3008/customers/register", payload);
    alert(response.data.message || "Registration successful! Please login.");
    navigate("/login");
  } catch (err) {
    alert(err.response?.data?.message || "Registration failed");
  }
};

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #fff4eb 0%, #fff2e6 100%)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="sm">
        <Box sx={{ mt: 1 }}>
          <Box sx={{ textAlign: "center", mb: 5 }}>
            <Typography
              variant="h3"
              sx={{ fontWeight: 700, color: "#65350F", mb: 1 }}
            >
              Join Us
            </Typography>
            <Typography sx={{ color: "#a0522d", fontSize: "1rem" }}>
              Create your bookstall account
            </Typography>
          </Box>

          <TextField
            fullWidth
            name="username"
            label="Username"
            variant="standard"
            sx={{ mt: 3 }}
            onChange={inputHandler}
            value={inputs.username}
          />

          <TextField
            fullWidth
            name="email"
            label="Email"
            type="email"
            variant="standard"
            sx={{ mt: 3 }}
            onChange={inputHandler}
            value={inputs.email}
          />

          <TextField
            fullWidth
            name="phonenumber"
            label="Phone Number"
            variant="standard"
            sx={{ mt: 3 }}
            onChange={inputHandler}
            value={inputs.phonenumber}
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

        <TextField
  fullWidth
  name="confirmpwd"
  label="Confirm Password"
  type="password"
  variant="standard"
  sx={{ mt: 3 }}
  onChange={inputHandler}
  value={inputs.confirmpwd ?? ""}     // ← use nullish coalescing

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
            onClick={submitHandler}
          >
            Register
          </Button>

          <Typography sx={{ mt: 4, textAlign: "center", color: "#666" }}>
            Already registered?{" "}
            <Link
              to="/login"
              style={{
                color: "#F18966",
                fontWeight: 600,
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              Login here
            </Link>
          </Typography>
        </Box>
      </Container>
    </div>
  );
};

export default Register;
