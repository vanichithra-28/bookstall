
import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Box
} from "@mui/material";
import Navbar from "../components/Navbar";

function ManageCustomers() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [customers, setCustomers] = useState([]);

  const addCustomer = () => {
    if (!name || !email || !phone) {
      alert("Please fill all fields");
      return;
    }

    const newCustomer = {
      id: Date.now(),
      name,
      email,
      phone
    };

    setCustomers([...customers, newCustomer]);

    setName("");
    setEmail("");
    setPhone("");
  };

  return (
    <div style={{ background: 'linear-gradient(135deg, #fff4eb 0%, #fff2e6 100%)', minHeight: '100vh', py: 5 }}>

      <Container sx={{ marginTop: 4 }}>
        <Box sx={{ mb: 6 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#1976d2" }}
        >
          Customer Management
        </Typography>

        <TextField
          label="Customer Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ marginRight: 2 }}
        />

        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ marginRight: 2 }}
        />

        <TextField
          label="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          sx={{ marginRight: 2 }}
        />

        <Button variant="contained" onClick={addCustomer}>
          Add Customer
        </Button>

        <Paper sx={{ marginTop: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
          </Box>
      </Container>
    
    </div>
  );
}

export default ManageCustomers;
