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
  });

  const navigate = useNavigate();

  const inputHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const submitHandler = () => {

    // password validation
    if (inputs.password !== inputs.confirmpwd) {
      alert("Passwords do not match");
      return;
    }

    axios
      .post("http://localhost:3008/", inputs)
      .then((res) => {
        console.log(res);
        alert("Registration successful");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
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
            value={inputs.confirmpwd}
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
            Create Account
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