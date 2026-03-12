

import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  InputAdornment
} from "@mui/material";

import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import {  useNavigate } from "react-router-dom";

function AdminLogin() {

   const navigate = useNavigate();

  const loginAdmin = async () => {

   navigate("/admin/dashboard");

  };

  return (

    <Box
      sx={{
        height: "100vh",
        background: "linear-gradient(to right, #2196F3, #21CBF3)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >

      <Card
        sx={{
          width: 380,
          padding: 3,
          borderRadius: 3,
          boxShadow: 10
        }}
      >

        <CardContent>

          <Typography
            variant="h4"
            align="center"
            fontWeight="bold"
            gutterBottom
          >
            Admin Login
          </Typography>

          <Typography
            variant="body2"
            align="center"
            color="text.secondary"
            mb={2}
          >
            Book Stall Management System
          </Typography>

          <TextField
            label="Email"
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              )
            }}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              )
            }}
          />

          <Button
            variant="contained"
            fullWidth
            size="large"
            sx={{
              marginTop: 3,
              padding: 1.2,
              fontWeight: "bold",
              borderRadius: 2
            }}
            onClick={loginAdmin}
          >
            Login
          </Button>

        </CardContent>

      </Card>

    </Box>

  );

}

export default AdminLogin;