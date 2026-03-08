import { useState } from "react";
import Navbar from "../Navbar";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper
} from "@mui/material";

function ManageBooks() {

  const [books, setBooks] = useState([]);
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(""); // category state
  const [editId, setEditId] = useState(null);
  const [showBooks, setShowBooks] = useState(false);

  const handleAddBook = () => {

    if (editId) {
      const updatedBooks = books.map((book) =>
        book.id === editId
          ? { ...book, name: bookName, author: author, price: price, category: category }
          : book
      );
      setBooks(updatedBooks);
      setEditId(null);
    } else {
      const newBook = {
        id: Date.now(),
        name: bookName,
        author: author,
        price: price,
        category: category
      };
      setBooks([...books, newBook]);
    }

    setBookName("");
    setAuthor("");
    setPrice("");
    setCategory("");
  };

  const handleDelete = (id) => {
    const updatedBooks = books.filter((book) => book.id !== id);
    setBooks(updatedBooks);
  };

  const handleEdit = (book) => {
    setBookName(book.name);
    setAuthor(book.author);
    setPrice(book.price);
    setCategory(book.category);
    setEditId(book.id);
  };

  return (
    <>
      <Navbar />

      <Container sx={{ marginTop: 4 }}>

        <Typography variant="h4" align="center" sx={{ marginBottom: 4 }}>
          Manage Books
        </Typography>

        <Grid container spacing={2} sx={{ marginBottom: 3 }}>

          <Grid item xs={12} md={3}>
            <TextField
              label="Book Name"
              fullWidth
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              label="Author"
              fullWidth
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              label="Price"
              fullWidth
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              label="Category"
              fullWidth
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </Grid>

        </Grid>

        <Button
          variant="contained"
          sx={{ marginRight: 2 }}
          onClick={handleAddBook}
        >
          {editId ? "Update Book" : "Add Book"}
        </Button>

        <Button
          variant="outlined"
          onClick={() => setShowBooks(true)}
        >
          View Books
        </Button>

        {showBooks && (

          <Paper sx={{ marginTop: 4 }}>
            <Table>

              <TableHead>
                <TableRow>
                  <TableCell>Book Name</TableCell>
                  <TableCell>Author</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>

                {books.map((book) => (
                  <TableRow key={book.id}>

                    <TableCell>{book.name}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>{book.price}</TableCell>
                    <TableCell>{book.category}</TableCell>

                    <TableCell>

                      <Button
                        variant="contained"
                        sx={{ marginRight: 1 }}
                        onClick={() => handleEdit(book)}
                      >
                        Edit
                      </Button>

                      <Button
                        color="error"
                        onClick={() => handleDelete(book.id)}
                      >
                        Delete
                      </Button>

                    </TableCell>

                  </TableRow>
                ))}

              </TableBody>

            </Table>
          </Paper>

        )}

      </Container>
    </>
  );
}

export default ManageBooks;