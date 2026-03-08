import { Container, Typography, Grid, Card, CardContent } from "@mui/material";
import Navbar from "../Navbar";

function AdminDashboard() {
  return (
    <>
      <Container sx={{ marginTop: 3 }}>
        <Typography
          variant="h4"
          align="center"
          sx={{ marginBottom: 4, fontWeight: "bold", color: "#1976d2" }}
        >
          Admin Dashboard
        </Typography>
      </Container>

      <Navbar />

      <Container sx={{ marginTop: 4 }}>
        <Grid container spacing={3}>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ backgroundColor: "#e3f2fd" }}>
              <CardContent>
                <Typography variant="h6">Total Books</Typography>
                <Typography variant="h4">120</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ backgroundColor: "#e8f5e9" }}>
              <CardContent>
                <Typography variant="h6">Categories</Typography>
                <Typography variant="h4">15</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ backgroundColor: "#fff3e0" }}>
              <CardContent>
                <Typography variant="h6">Customers</Typography>
                <Typography variant="h4">45</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ backgroundColor: "#fce4ec" }}>
              <CardContent>
                <Typography variant="h6">Sales Today</Typography>
                <Typography variant="h4">₹5000</Typography>
              </CardContent>
            </Card>
          </Grid>

        </Grid>
      </Container>
    </>
  );
}

export default AdminDashboard;