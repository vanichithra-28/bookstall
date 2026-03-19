import React from "react";

import UpdateStock from "./pages/UpdateStocks";
import ViewBooks from "./pages/ViewBooks";
import Navbar, { drawerWidth } from "../staff/components/Navbar";
import { Route, Routes } from "react-router-dom";
import Billing from "./pages/Billing";
import { Box, Toolbar } from "@mui/material";
import Home from "./pages/Home";

const StaffRoutes = ({ onLogout }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Navbar onLogout={onLogout} /> {/* pass logout handler */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, ml: `${drawerWidth}px` }}>
        <Toolbar />
        <Routes>
          {/* Default dashboard */}
          <Route path="/" element={<Home />} />

          {/* Staff pages */}
          <Route path="update-stocks" element={<UpdateStock />} />
          <Route path="view-books" element={<ViewBooks />} />
          <Route path="billing" element={<Billing />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default StaffRoutes;