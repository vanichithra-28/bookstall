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
import { motion } from "framer-motion";

/* Motion wrappers */
const MotionBox = motion.create(Box);
const MotionTypography = motion.create(Typography);

/* Floating Books */
const FloatingBook = ({ delay, x, y, rotation }) => (
  <MotionBox
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0.1, 0.2, 0.1],
      scale: 1,
      y: [0, -15, 0],
      rotate: [rotation, rotation + 5, rotation],
    }}
    transition={{ duration: 4, repeat: Infinity, delay }}
    sx={{
      position: "absolute",
      left: x,
      top: y,
      width: 40,
      height: 50,
      background: "linear-gradient(135deg, #a0522d, #65350F)",
      borderRadius: "2px 6px 6px 2px",
      pointerEvents: "none",
      zIndex: 0,
    }}
  />
);

function ManageCustomers() {
  const [customers, setCustomers] = useState([]);

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
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      sx={{
        background: "linear-gradient(135deg, #fff4eb 0%, #fff2e6 100%)",
        minHeight: "100vh",
        py: 6,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Floating Books */}
      <FloatingBook delay={0} x="5%" y="15%" rotation={-15} />
      <FloatingBook delay={0.5} x="92%" y="20%" rotation={10} />
      <FloatingBook delay={1} x="88%" y="70%" rotation={-10} />

      <Container sx={{ position: "relative", zIndex: 1 }}>

        {/* Title */}
        <MotionTypography
          variant="h3"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          sx={{ fontWeight: "bold", color: "#65350F", mb: 4 }}
        >
          Customers
        </MotionTypography>

        {/* Table */}
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Paper
            sx={{
              borderRadius: 3,
              background: "rgba(255,255,255,0.9)",
              backdropFilter: "blur(10px)",
              overflow: "hidden",
              boxShadow: "0 6px 18px rgba(101,53,15,0.08)",
            }}
          >
            <Table>

              <TableHead sx={{ backgroundColor: "#a0522d" }}>
                <TableRow>
                  <TableCell sx={{ color: "#fff" }}><b>Name</b></TableCell>
                  <TableCell sx={{ color: "#fff" }}><b>Email</b></TableCell>
                  <TableCell sx={{ color: "#fff" }}><b>Phone</b></TableCell>
                  <TableCell sx={{ color: "#fff" }}><b>Status</b></TableCell>
                  <TableCell sx={{ color: "#fff" }}><b>Action</b></TableCell>
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
                  customers.map((customer, index) => (
                    <motion.tr
                      key={customer._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <TableCell>{customer.username}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{customer.phonenumber}</TableCell>

                      <TableCell
                        sx={{
                          fontWeight: 600,
                          color:
                            customer.status === "accepted"
                              ? "green"
                              : customer.status === "rejected"
                              ? "red"
                              : "#a0522d",
                        }}
                      >
                        {customer.status}
                      </TableCell>

                      <TableCell>
                        {customer.status === "pending" ? (
                          <>
                            <Button
                              variant="contained"
                              sx={{
                                mr: 1,
                                bgcolor: "#a0522d",
                                "&:hover": { bgcolor: "#65350F" },
                              }}
                              onClick={() => handleStatus(customer._id, "accepted")}
                            >
                              Accept
                            </Button>

                            <Button
                              variant="contained"
                              sx={{
                                bgcolor: "#d9534f",
                                "&:hover": { bgcolor: "#c9302c" },
                              }}
                              onClick={() => handleStatus(customer._id, "rejected")}
                            >
                              Reject
                            </Button>
                          </>
                        ) : (
                          <Typography sx={{ fontWeight: 500 }}>
                            {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                          </Typography>
                        )}
                      </TableCell>
                    </motion.tr>
                  ))
                )}
              </TableBody>

            </Table>
          </Paper>
        </MotionBox>

      </Container>
    </MotionBox>
  );
}

export default ManageCustomers;