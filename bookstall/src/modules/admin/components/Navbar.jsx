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
  Home05Icon,
  Bookshelf03Icon,
  User03Icon,
  LibraryIcon,
  DiscountTag02Icon,
  ShoppingBasket01Icon,
  Logout01Icon,
} from "@hugeicons/core-free-icons";

export const drawerWidth = 72;

const Navbar = ({ onLogout }) => {
  const location = useLocation();

  const menuItems = [
    { text: "Dashboard", to: "/admin", icon: Home05Icon }, // fixed path
    { text: "Manage Books", to: "/admin/books", icon: LibraryIcon },
    { text: "Categories", to: "/admin/categories", icon: Bookshelf03Icon },
    { text: "Customers", to: "/admin/customers", icon: User03Icon },
    { text: "Stock", to: "/admin/stock", icon: ShoppingBasket01Icon },
    { text: "Sales", to: "/admin/sales", icon: DiscountTag02Icon },
  ];

  return (
    <Drawer variant="permanent" className="app-navbar">
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

        {/* Logout / Change Role */}
        <ListItem disablePadding>
          <Tooltip title="Logout" placement="right">
            <ListItemButton
              onClick={() => {
                if (onLogout) onLogout(); // call App's logout handler
              }}
              className="nav-button logout-button"
            >
              <ListItemIcon className="nav-icon">
                <HugeiconsIcon icon={Logout01Icon} size={24} />
              </ListItemIcon>
            </ListItemButton>
          </Tooltip>
        </ListItem>
      </Box>
    </Drawer>
  );
};

export default Navbar;