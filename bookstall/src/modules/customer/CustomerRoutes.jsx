import { Box, Toolbar } from "@mui/material";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar, { drawerWidth } from "./components/Navbar";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Category from "./pages/Category";
import Books from "./pages/Books";
import Orders from "./pages/Orders";
import Checkout from "./pages/Checkout";

const CustomerRoutes = ({ onLogout }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Navbar onLogout={onLogout} />

      <Box component="main" sx={{ flexGrow: 1, p: 3, ml: `${drawerWidth}px` }}>
        <Toolbar />

        <Routes>
          <Route path="" element={<Home />} />

          {/* Customer pages */}
          <Route path="categories" element={<Category />} />
          <Route path="categories/:catName" element={<Category />} />

          <Route path="books/:id" element={<Books />} />
          <Route path="orders" element={<Orders />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="cart" element={<Shop />} />

          <Route path="*" element={<Home />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default CustomerRoutes;