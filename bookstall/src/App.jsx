import { Routes, Route } from "react-router-dom"
import Navbar, { drawerWidth } from "./modules/customer/components/Navbar"
import Home from "./modules/customer/pages/Home"
import Login from "./modules/customer/pages/Login"
import Register from "./modules/customer/pages/Register"

import Orders from "./modules/customer/pages/Orders"
import './App.css'
import Shop from "./modules/customer/pages/Shop"
import Books from "./modules/customer/pages/Books"
import Category from "./modules/customer/pages/Category"
import { Box, Toolbar } from '@mui/material'
import Booklist from "./modules/customer/pages/Booklist"
import Checkout from "./modules/customer/pages/Checkout"
import AdminDashboard from "./modules/admin/AdminDashboard"

function App() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar />
  
      {/* Add Toolbar here to offset the fixed drawer if any */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, ml: `${drawerWidth}px` }}>
        <Toolbar />
        <Routes>
          
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Shop />} />
          <Route path="/categories" element={<Category />} />
          <Route path="/booklist/:id" element={<Booklist />} />
          <Route path="/books/:id" element={<Books />} />
          <Route path="/cart" element={<Shop />} /> 
          <Route path="/orders" element={<Orders />} />
          <Route path="/checkout" element={<Checkout />} />


          
    
        </Routes>
      </Box>
    </Box>
  )
}

export default App