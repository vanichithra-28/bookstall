import React from 'react'
import { Button, Stack, Typography, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
const Role = () => {
    const roleLinks = [
  { label: "Guest", to: "/guest" },
  { label: "Customer", to: "/customer" },
  { label: "Staff", to: "/staff" },
  { label: "Admin", to: "/admin/login" },
];
  return (
    <div>
      <Box sx={{ p: 4, textAlign: "center" }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
        Bookstall Role Portal
      </Typography>

      <Stack spacing={2} alignItems="center">
        {roleLinks.map((role) => (
          <Button
            key={role.label}
            component={RouterLink}
            to={role.to}
            variant="contained"
            sx={{ minWidth: 220 }}
          >
            Continue as {role.label}
          </Button>
        ))}
      </Stack>
    </Box>
    </div>
  )
}

export default Role
