import React from 'react';
import { Box, Toolbar } from '@mui/material';
import { Routes, Route } from "react-router-dom";
import Navbar, { drawerWidth } from './components/Navbar'; // Ensure drawerWidth is exported from Navbar
import AdminDashboard from './pages/AdminDashboard';
import ManageBooks from './pages/ManageBooks';
import ManageCategories from './pages/ManageCategories';
import ManageCustomers from './pages/ManageCustomers';
import StockManagement from './pages/StockManagement';
import Sales from './pages/Sales';
import StaffRegistration from './pages/StaffRegistration';

const AdminRoutes = ({ onLogout }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar onLogout={onLogout} /> 

      {/* Added the margin-left and flexGrow to match CustomerRoutes logic */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: 3, 
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` } 
        }}
      >
        <Toolbar />
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="books" element={<ManageBooks />} />
          <Route path="categories" element={<ManageCategories />} />
          <Route path="customers" element={<ManageCustomers />} />
          <Route path="stock" element={<StockManagement />} />
          <Route path="sales" element={<Sales />} />
          <Route path="staff-registration" element={<StaffRegistration />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default AdminRoutes;