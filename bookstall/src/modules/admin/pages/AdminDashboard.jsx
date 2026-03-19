import { Container, Typography, Grid, Card, CardContent, Box } from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CategoryIcon from "@mui/icons-material/Category";
import PeopleIcon from "@mui/icons-material/People";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useEffect, useState } from "react";
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

function AdminDashboard() {
  const [booksCount, setBooksCount] = useState(0);
  const [categoriesCount, setCategoriesCount] = useState(0);
  const [customersCount, setCustomersCount] = useState(0);
  const [salesToday, setSalesToday] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:3008/admin/stats");
        if (res.data.success) {
          setBooksCount(res.data.booksCount);
          setCategoriesCount(res.data.categoriesCount);
          setCustomersCount(res.data.customersCount);
          setSalesToday(res.data.salesToday);
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      sx={{ background: "linear-gradient(135deg, #fff4eb 0%, #fff2e6 100%)", minHeight: "100vh", position: "relative", overflow: "hidden", py: 6 }}
    >
      {/* Floating Books */}
      <FloatingBook delay={0} x="5%" y="10%" rotation={-15} />
      <FloatingBook delay={0.5} x="90%" y="25%" rotation={10} />
      <FloatingBook delay={1} x="85%" y="75%" rotation={-10} />

      <Container sx={{ position: "relative", zIndex: 1, pt: 4 }}>
        {/* Title */}
        <MotionTypography
          variant="h4"
          align="center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          sx={{ marginBottom: 5, fontWeight: "bold", color: "#65350F" }}
        >
          Admin Dashboard
        </MotionTypography>

        <Grid container spacing={4}>
          {[
            { icon: MenuBookIcon, label: "Total Books", value: booksCount, color: "#8b4513" },
            { icon: CategoryIcon, label: "Categories", value: categoriesCount, color: "#A0522D" },
            { icon: PeopleIcon, label: "Customers", value: customersCount, color: "#F18966" },
            { icon: CurrencyRupeeIcon, label: "Sales Today", value: `₹${salesToday}`, color: "#F18966" },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    sx={{
                      backgroundColor: "#fff2e6",
                      borderLeft: `6px solid ${item.color}`,
                      borderRadius: 3,
                      boxShadow: 3,
                      transition: "0.3s",
                      "&:hover": { transform: "scale(1.05)" },
                    }}
                  >
                    <CardContent>
                      <Icon sx={{ fontSize: 40, color: item.color }} />
                      <Typography variant="h6">{item.label}</Typography>
                      <Typography variant="h4" sx={{ color: "#8b4513", fontWeight: "bold" }}>
                        {item.value}
                      </Typography>
                    </CardContent>
                  </Card>
                </MotionBox>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </MotionBox>
  );
}

export default AdminDashboard;