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
  Paper
} from "@mui/material";

function Sales() {

  const [book, setBook] = useState("");
  const [customer, setCustomer] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [sales, setSales] = useState([]);

  const addSale = () => {

    if (!book || !customer || !quantity || !price) {
      alert("Please enter all fields");
      return;
    }

    const total = quantity * price;

    const newSale = {
      book,
      customer,
      quantity,
      price,
      total
    };

    setSales([...sales, newSale]);

    setBook("");
    setCustomer("");
    setQuantity("");
    setPrice("");
  };

  // Calculate summary
  const totalBooksSold = sales.reduce((sum, sale) => sum + Number(sale.quantity), 0);
  const totalRevenue = sales.reduce((sum, sale) => sum + Number(sale.total), 0);

  return (
    <Container sx={{ marginTop: 4 }}>

      <Typography variant="h4" gutterBottom>
        Sales Report
      </Typography>

      <TextField
        label="Book Name"s
        value={book}
        onChange={(e) => setBook(e.target.value)}
        sx={{ marginRight: 2 }}
      />

      <TextField
        label="Customer Name"
        value={customer}
        onChange={(e) => setCustomer(e.target.value)}
        sx={{ marginRight: 2 }}
      />

      <TextField
        label="Quantity"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        sx={{ marginRight: 2 }}
      />

      <TextField
        label="Price"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        sx={{ marginRight: 2 }}
      />

      <Button
        variant="contained"
        onClick={addSale}
      >
        Record Sale
      </Button>

      {/* Sales Table */}

      <Paper sx={{ marginTop: 4 }}>
        <Table>

          <TableHead>
            <TableRow>
              <TableCell>Book</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>

            {sales.map((sale, index) => (
              <TableRow key={index}>
                <TableCell>{sale.book}</TableCell>
                <TableCell>{sale.customer}</TableCell>
                <TableCell>{sale.quantity}</TableCell>
                <TableCell>₹{sale.price}</TableCell>
                <TableCell>₹{sale.total}</TableCell>
              </TableRow>
            ))}

          </TableBody>

        </Table>
      </Paper>

      {/* Sales Summary */}

      <Paper sx={{ marginTop: 4, padding: 2 }}>
        <Typography variant="h6">
          Total Books Sold: {totalBooksSold}
        </Typography>

        <Typography variant="h6">
          Total Revenue: ₹{totalRevenue}
        </Typography>
      </Paper>

    </Container>
  );
}

export default Sales;