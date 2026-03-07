import React from "react";
import {
  Box,
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Tooltip,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ShoppingCart01Icon,
  Invoice01Icon,
  Login01Icon,
  Home05Icon,
  Logout01Icon,
  Bookshelf03Icon,
} from "@hugeicons/core-free-icons";

export const drawerWidth = 72;

const Navbar = () => {
  const location = useLocation();

  const menuItems = [
    { text: "Home", to: "/", icon: Home05Icon },
    { text: "Categories", to: "/categories", icon:Bookshelf03Icon },
    { text: "Cart", to: "/cart", icon: ShoppingCart01Icon },
    { text: "Orders", to: "/orders", icon: Invoice01Icon },
    { text: "Login", to: "/login", icon: Login01Icon },
    
  ];

  return (
    <Drawer
      variant="permanent"
      className="app-navbar"
    >
      <Toolbar />

      <Box className="app-navbar-content">
        <List>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.to;

            return (
              <ListItem key={item.text} disablePadding>
                <Tooltip title={item.text} placement="right">
                  <ListItemButton
                    component={Link}
                    to={item.to}
                    className={`nav-button ${isActive ? "active" : ""}`}
                  >
                    <ListItemIcon className="nav-icon">
                      <HugeiconsIcon icon={item.icon} size={24} />
                    </ListItemIcon>
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
};

export default Navbar;