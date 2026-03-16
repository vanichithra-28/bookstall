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

const StaffRegistration = () => {
  const [staffName, setStaffName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [staffList, setStaffList] = useState([]);
  const [editingStaff, setEditingStaff] = useState(null); // track staff being edited

  // Fetch staff list on mount
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await axios.get("http://localhost:3008/customers/staff");
        setStaffList(res.data); // backend already returns staff only
      } catch (error) {
        console.error("Error fetching staff:", error);
      }
    };
    fetchStaff();
  }, []);

  // Register or Update staff
  const handleRegisterOrUpdate = async () => {
    if (!staffName || !email || !phoneNumber || (!password && !editingStaff)) {
      setFeedback({ type: "error", message: "Please fill all required fields" });
      return;
    }

    const staffData = {
      username: staffName,
      email,
      phonenumber: phoneNumber,
      ...(password && { password }), // only send password if provided
      role: "staff",
    };

    setLoading(true);
    try {
      if (editingStaff) {
        // Update existing staff
        const res = await axios.put(
          `http://localhost:3008/customers/staff/${editingStaff}`,
          staffData
        );
        setFeedback({ type: "success", message: res.data.message });
        setStaffList(
          staffList.map((s) => (s._id === editingStaff ? res.data.user : s))
        );
        setEditingStaff(null);
      } else {
        // Register new staff
        const res = await axios.post(
          "http://localhost:3008/customers/register",
          staffData
        );
        setFeedback({ type: "success", message: res.data.message });
        setStaffList([...staffList, res.data.user]);
      }

      // clear form
      setStaffName("");
      setEmail("");
      setPhoneNumber("");
      setPassword("");
    } catch (error) {
      console.error("Registration/Update error:", error);
      setFeedback({
        type: "error",
        message: error.response?.data?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  // Populate form for editing
  const handleEdit = (staff) => {
    setStaffName(staff.username);
    setEmail(staff.email);
    setPhoneNumber(staff.phonenumber);
    setPassword(""); // leave blank for security
    setEditingStaff(staff._id);
  };

  // Delete staff
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3008/customers/staff/${id}`);
      setStaffList(staffList.filter((s) => s._id !== id));
      setFeedback({ type: "success", message: "Staff deleted successfully" });
    } catch (error) {
      setFeedback({
        type: "error",
        message: error.response?.data?.message || "Delete failed",
      });
    }
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #fff4eb 0%, #fff2e6 100%)",
        minHeight: "100vh",
        py: 6,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          sx={{
            p: 5,
            borderRadius: 3,
            boxShadow: "0 6px 18px rgba(101,53,15,0.12)",
            mb: 6,
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, color: "#65350F", mb: 3, textAlign: "center" }}
          >
            Staff Registration
          </Typography>

          {feedback && (
            <Alert severity={feedback.type} sx={{ mb: 3, borderRadius: 2 }}>
              {feedback.message}
            </Alert>
          )}

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Full Name"
                fullWidth
                value={staffName}
                onChange={(e) => setStaffName(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Phone Number"
                fullWidth
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                fullWidth
                onClick={handleRegisterOrUpdate}
                disabled={loading}
                sx={{
                  bgcolor: "#F18966",
                  "&:hover": { bgcolor: "#a0522d" },
                  py: 1.2,
                  fontWeight: 600,
                  borderRadius: 2,
                }}
              >
                {loading
                  ? "Processing..."
                  : editingStaff
                  ? "Update Staff"
                  : "Register Staff"}
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Staff List */}
        <Paper
          sx={{
            p: 4,
            borderRadius: 3,
            boxShadow: "0 6px 18px rgba(101,53,15,0.08)",
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, color: "#65350F", mb: 3 }}
          >
            Staff Members
          </Typography>

          {staffList.length === 0 ? (
            <Typography sx={{ color: "#a0522d" }}>
              No staff registered yet.
            </Typography>
          ) : (
            <List>
              {staffList.map((staff) => (
                <React.Fragment key={staff._id}>
                  <ListItem
                    secondaryAction={
                      <Box>
                        <Button
                          size="small"
                          sx={{ mr: 1 }}
                          onClick={() => handleEdit(staff)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="small"
                          color="error"
                          onClick={() => handleDelete(staff._id)}
                        >
                          Delete
                        </Button>
                      </Box>
                    }
                  >
                    <ListItemText
                      primary={staff.username}
                      secondary={staff.email}
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default StaffRegistration;