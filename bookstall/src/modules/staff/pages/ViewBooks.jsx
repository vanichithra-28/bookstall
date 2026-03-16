import React from "react";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper
} from "@mui/material";

function ViewBooks() {

  const books = [];   // empty list

  return (
    <Container sx={{ mt: 5 }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#1976d2" }}
      >
        View Books
      </Typography>

      <Paper elevation={3} sx={{ padding: 2 }}>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>ID</b></TableCell>
              <TableCell><b>Book Name</b></TableCell>
              <TableCell><b>Author</b></TableCell>
              <TableCell><b>Price</b></TableCell>
              <TableCell><b>Stock</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {books.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No Books Available
                </TableCell>
              </TableRow>
            )}
          </TableBody>

        </Table>

      </Paper>
    </Container>
  );
}

export default ViewBooks;