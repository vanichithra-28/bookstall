import React, { useState, useEffect } from "react";
import axios from "axios";
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
  Grid,
  Card,
  CardContent,
  Stack
} from "@mui/material";

import MenuBookIcon from "@mui/icons-material/MenuBook";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import BarChartIcon from "@mui/icons-material/BarChart";

import { motion } from "framer-motion";

/* Motion wrappers */
const MotionBox = motion.create(Box);
const MotionCard = motion.create(Card);
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

function Sales() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const res = await axios.get("http://localhost:3008/sales");
        setSales(res.data);
      } catch (err) {
        console.error("Failed to fetch sales", err);
      }
    };
    fetchSales();
  }, []);

  const totalBooksSold = sales.reduce(
    (sum, sale) => sum + Number(sale.quantity),
    0
  );

  const totalRevenue = sales.reduce(
    (sum, sale) => sum + Number(sale.total),
    0
  );

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
        <Stack direction="row" spacing={1} alignItems="center" mb={4}>
          <BarChartIcon sx={{ fontSize: 35, color: "#65350F" }} />
          <MotionTypography
            variant="h3"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            sx={{ fontWeight: "bold", color: "#65350F" }}
          >
            Sales Report
          </MotionTypography>
        </Stack>

        {/* Summary Cards */}
        <Grid container spacing={3} mb={4}>

          <Grid item xs={12} md={6}>
            <MotionCard
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6, scale: 1.03 }}
              sx={{
                borderRadius: 3,
                background: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(10px)",
              }}
            >
              <CardContent sx={{ display: "flex", alignItems: "center" }}>
                <MenuBookIcon sx={{ fontSize: 40, mr: 2, color: "#a0522d" }} />
                <Box>
                  <Typography variant="h6">Books Sold</Typography>
                  <Typography variant="h4">{totalBooksSold}</Typography>
                </Box>
              </CardContent>
            </MotionCard>
          </Grid>

          <Grid item xs={12} md={6}>
            <MotionCard
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6, scale: 1.03 }}
              transition={{ delay: 0.1 }}
              sx={{
                borderRadius: 3,
                background: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(10px)",
              }}
            >
              <CardContent sx={{ display: "flex", alignItems: "center" }}>
                <CurrencyRupeeIcon sx={{ fontSize: 40, mr: 2, color: "#65350F" }} />
                <Box>
                  <Typography variant="h6">Total Revenue</Typography>
                  <Typography variant="h4">₹{totalRevenue}</Typography>
                </Box>
              </CardContent>
            </MotionCard>
          </Grid>

        </Grid>

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
            }}
          >
            <Table>
              <TableHead sx={{ backgroundColor: "#a0522d" }}>
                <TableRow>
                  <TableCell sx={{ color: "#fff" }}>Book</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Customer</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Quantity</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Price</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Total</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {sales.length > 0 ? (
                  sales.map((sale, index) => (
                    <motion.tr
                      key={sale._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <TableCell>{sale.book}</TableCell>
                      <TableCell>{sale.customer}</TableCell>
                      <TableCell>{sale.quantity}</TableCell>
                      <TableCell>₹{sale.price}</TableCell>
                      <TableCell sx={{ fontWeight: "bold", color: "#65350F" }}>
                        ₹{sale.total}
                      </TableCell>
                    </motion.tr>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No sales data available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Paper>
        </MotionBox>

      </Container>
    </MotionBox>
  );
}

export default Sales;