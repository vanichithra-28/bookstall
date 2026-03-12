import { Container, Typography, Grid, Card, CardContent } from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CategoryIcon from "@mui/icons-material/Category";
import PeopleIcon from "@mui/icons-material/People";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

function AdminDashboard() {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #fff4eb 0%, #fff2e6 100%)",
        minHeight: "100vh",
      }}
    >
      <Container sx={{ paddingTop: 4, paddingLeft: 8, paddingRight: 8 }}>
        <Typography
          variant="h4"
          align="center"
          sx={{ marginBottom: 5, fontWeight: "bold", color: "#65350F" }}
        >
          Admin Dashboard
        </Typography>

        <Grid container spacing={4}>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                backgroundColor: "#fff2e6",
                borderLeft: "6px solid #8b4513",
                borderRadius: 3,
                boxShadow: 3,
                transition: "0.3s",
                "&:hover": { transform: "scale(1.05)" }
              }}
            >
              <CardContent>
                <MenuBookIcon sx={{ fontSize: 40, color: "#8b4513" }} />
                <Typography variant="h6">Total Books</Typography>
                <Typography variant="h4" sx={{ color: "#A0522D", fontWeight: "bold" }}>
                  120
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                backgroundColor: "#fff2e6",
                borderLeft: "6px solid #A0522D",
                borderRadius: 3,
                boxShadow: 3,
                transition: "0.3s",
                "&:hover": { transform: "scale(1.05)" }
              }}
            >
              <CardContent>
                <CategoryIcon sx={{ fontSize: 40, color: "#A0522D" }} />
                <Typography variant="h6">Categories</Typography>
                <Typography variant="h4" sx={{ color: "#8b4513", fontWeight: "bold" }}>
                  15
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                backgroundColor: "#fff2e6",
                borderLeft: "6px solid #F18966",
                borderRadius: 3,
                boxShadow: 3,
                transition: "0.3s",
                "&:hover": { transform: "scale(1.05)" }
              }}
            >
              <CardContent>
                <PeopleIcon sx={{ fontSize: 40, color: "#F18966" }} />
                <Typography variant="h6">Customers</Typography>
                <Typography variant="h4" sx={{ color: "#8b4513", fontWeight: "bold" }}>
                  45
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                backgroundColor: "#fff2e6",
                borderLeft: "6px solid #F18966",
                borderRadius: 3,
                boxShadow: 3,
                transition: "0.3s",
                "&:hover": { transform: "scale(1.05)" }
              }}
            >
              <CardContent>
                <CurrencyRupeeIcon sx={{ fontSize: 40, color: "#F18966" }} />
                <Typography variant="h6">Sales Today</Typography>
                <Typography variant="h4" sx={{ color: "#A0522D", fontWeight: "bold" }}>
                  ₹5000
                </Typography>
              </CardContent>
            </Card>
          </Grid>

        </Grid>
      </Container>
    </div>
  );
}

export default AdminDashboard;