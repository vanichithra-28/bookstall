import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Box,
  Alert,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

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

const StaffRegistration = () => {
  const [staffName, setStaffName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [staffList, setStaffList] = useState([]);
  const [editingStaff, setEditingStaff] = useState(null);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await axios.get("http://localhost:3008/customers/staff");
        setStaffList(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchStaff();
  }, []);

  const handleRegisterOrUpdate = async () => {
    if (!staffName || !email || !phoneNumber || (!password && !editingStaff)) {
      setFeedback({ type: "error", message: "Please fill all required fields" });
      return;
    }

    const staffData = {
      username: staffName,
      email,
      phonenumber: phoneNumber,
      ...(password && { password }),
      role: "staff",
    };

    setLoading(true);
    try {
      if (editingStaff) {
        const res = await axios.put(
          `http://localhost:3008/customers/staff/${editingStaff}`,
          staffData
        );
        setStaffList(
          staffList.map((s) => (s._id === editingStaff ? res.data.user : s))
        );
        setEditingStaff(null);
      } else {
        const res = await axios.post(
          "http://localhost:3008/customers/register",
          staffData
        );
        setStaffList([...staffList, res.data.user]);
      }

      setFeedback({ type: "success", message: "Success" });
      setStaffName("");
      setEmail("");
      setPhoneNumber("");
      setPassword("");
    } catch (error) {
      setFeedback({
        type: "error",
        message: error.response?.data?.message || "Error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (staff) => {
    setStaffName(staff.username);
    setEmail(staff.email);
    setPhoneNumber(staff.phonenumber);
    setPassword("");
    setEditingStaff(staff._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3008/customers/staff/${id}`);
      setStaffList(staffList.filter((s) => s._id !== id));
      setFeedback({ type: "success", message: "Deleted" });
    } catch (error) {
      console.error(error);
      setFeedback({ type: "error", message: "Delete failed" });
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
      <FloatingBook delay={0.5} x="90%" y="20%" rotation={10} />
      <FloatingBook delay={1} x="85%" y="75%" rotation={-10} />

      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1 }}>
        
        {/* Title Animation */}
        <MotionTypography
          variant="h3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          sx={{
            fontWeight: 700,
            color: "#65350F",
            mb: 3,
            textAlign: "center",
          }}
        >
          Staff Registration
        </MotionTypography>

        {/* Form */}
        <MotionBox initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <Paper sx={{ p: 5, borderRadius: 3, mb: 6 }}>
            {feedback && (
              <Alert severity={feedback.type} sx={{ mb: 3 }}>
                {feedback.message}
              </Alert>
            )}

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField label="Full Name" fullWidth value={staffName} onChange={(e) => setStaffName(e.target.value)} />
              </Grid>

              <Grid item xs={12}>
                <TextField label="Email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
              </Grid>

              <Grid item xs={12}>
                <TextField label="Phone Number" fullWidth value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
              </Grid>

              <Grid item xs={12}>
                <TextField label="Password" type="password" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleRegisterOrUpdate}
                  sx={{ bgcolor: "#F18966" }}
                >
                  {loading ? "Processing..." : editingStaff ? "Update Staff" : "Register Staff"}
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </MotionBox>

        {/* Staff List */}
        <MotionBox initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Paper sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: "#65350F", mb: 3 }}>
              Staff Members
            </Typography>

            <List>
              <AnimatePresence>
                {staffList.map((staff) => (
                  <motion.div
                    key={staff._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <ListItem
                      secondaryAction={
                        <Box>
                          <Button size="small" onClick={() => handleEdit(staff)}>Edit</Button>
                          <Button size="small" color="error" onClick={() => handleDelete(staff._id)}>Delete</Button>
                        </Box>
                      }
                    >
                      <ListItemText primary={staff.username} secondary={staff.email} />
                    </ListItem>
                    <Divider />
                  </motion.div>
                ))}
              </AnimatePresence>
            </List>
          </Paper>
        </MotionBox>

      </Container>
    </MotionBox>
  );
};

export default StaffRegistration;