import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Box,
  Button,
} from "@mui/material";
import axios from "axios";

function ManageCustomers() {
  const [customers, setCustomers] = useState([]);

  // Fetch customers with role = "customer"
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await axios.get("http://localhost:3008/customers/customer");
        setCustomers(res.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };
    fetchCustomers();
  }, []);

  // Handle status update
  const handleStatus = async (id, newStatus) => {
    try {
      const res = await axios.put(
        `http://localhost:3008/customers/${id}/status`,
        { status: newStatus }
      );
      setCustomers(customers.map(c => c._id === id ? res.data : c));
    } catch (err) {
      console.error("Status update error:", err);
      alert("Failed to update status.");
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #fdf6f0 0%, #fef9f6 100%)", // pastel cream gradient
        minHeight: "100vh",
        paddingTop: "40px",
      }}
    >
      <Container>
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#65350F" }} // lavender heading
          >
          Customers
          </Typography>

          <Paper sx={{ marginTop: 4, borderRadius: 3, boxShadow: "0 6px 18px rgba(0,0,0,0.08)" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><b>Name</b></TableCell>
                  <TableCell><b>Email</b></TableCell>
                  <TableCell><b>Phone</b></TableCell>
                  <TableCell><b>Status</b></TableCell>
                  <TableCell><b>Action</b></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {customers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No customers found.
                    </TableCell>
                  </TableRow>
                ) : (
                  customers.map((customer) => (
                    <TableRow key={customer._id} hover>
                      <TableCell>{customer.username}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{customer.phonenumber}</TableCell>
                      <TableCell>{customer.status}</TableCell>
                      <TableCell>
                        {customer.status === "pending" ? (
                          <>
                            <Button
                              variant="contained"
                              sx={{
                                mr: 1,
                                bgcolor: "#a3d2ca", // pastel teal
                                "&:hover": { bgcolor: "#5eaaa8" },
                              }}
                              onClick={() => handleStatus(customer._id, "accepted")}
                            >
                              Accept
                            </Button>
                            <Button
                              variant="contained"
                              sx={{
                                bgcolor: "#ffc8dd", // pastel blush
                                "&:hover": { bgcolor: "#ffafcc" },
                              }}
                              onClick={() => handleStatus(customer._id, "rejected")}
                            >
                              Reject
                            </Button>
                          </>
                        ) : (
                          <Typography>
                            {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                          </Typography>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Paper>
        </Box>
      </Container>
    </div>
  );
}

export default ManageCustomers;