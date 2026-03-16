import React, { useState } from "react";
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
  Logout01Icon,
  ShoppingCart01Icon,
  Invoice01Icon,
} from "@hugeicons/core-free-icons";
import { motion, AnimatePresence } from "framer-motion";

export const drawerWidth = 72;

// Motion wrapper for MUI components
const MotionBox = motion.create(Box);
const MotionListItem = motion.create(ListItem);
const MotionListItemButton = motion.create(ListItemButton);

const Navbar = ({ onLogout }) => {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isLogoutHovered, setIsLogoutHovered] = useState(false);

  const menuItems = [
    { text: "Home", to: "/customer", icon: Home05Icon },
    { text: "Categories", to: "/customer/categories", icon: Bookshelf03Icon },
    { text: "Cart", to: "/customer/cart", icon: ShoppingCart01Icon },
    { text: "Orders", to: "/customer/orders", icon: Invoice01Icon },
  ];

  // Animation variants
  const drawerVariants = {
    hidden: { x: -72, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    },
  };

  const iconHoverVariants = {
    rest: { scale: 1, rotate: 0 },
    hover: {
      scale: 1.2,
      rotate: [0, -10, 10, -5, 5, 0],
      transition: {
        rotate: {
          duration: 0.5,
          ease: "easeInOut",
        },
        scale: {
          type: "spring",
          stiffness: 400,
          damping: 17,
        },
      },
    },
    tap: { scale: 0.9 },
  };

  const activeIndicatorVariants = {
    hidden: { scaleY: 0, opacity: 0 },
    visible: {
      scaleY: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30,
      },
    },
  };

  const pulseVariants = {
    initial: { scale: 1, opacity: 0.5 },
    animate: {
      scale: [1, 1.5, 1],
      opacity: [0.5, 0, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const logoutIconVariants = {
    rest: { x: 0 },
    hover: {
      x: [0, 4, 0],
      transition: {
        duration: 0.4,
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  };

  return (
    <Drawer
      variant="permanent"
      className="app-navbar"
      sx={{
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          overflow: "visible",
        },
      }}
    >
      <Toolbar />
      <MotionBox
        className="app-navbar-content"
        variants={drawerVariants}
        initial="hidden"
        animate="visible"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          py: 2,
          position: "relative",
        }}
      >
        {/* Decorative floating orb */}
        <MotionBox
          sx={{
            position: "absolute",
            top: "20%",
            left: "50%",
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(139,69,19,0.15) 0%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <List sx={{ position: "relative", zIndex: 1 }}>
          {menuItems.map((item,) => {
            const isActive = location.pathname === item.to;

            return (
              <MotionListItem
                key={item.text}
                disablePadding
                variants={itemVariants}
                sx={{ position: "relative", mb: 1 }}
                onHoverStart={() => setHoveredItem(item.text)}
                onHoverEnd={() => setHoveredItem(null)}
              >
                {/* Active indicator bar */}
                <AnimatePresence>
                  {isActive && (
                    <MotionBox
                      variants={activeIndicatorVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      sx={{
                        position: "absolute",
                        left: 0,
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: 4,
                        height: 32,
                        borderRadius: "0 4px 4px 0",
                        background: "linear-gradient(180deg, #8B4513 0%, #A0522D 100%)",
                        boxShadow: "0 0 10px rgba(139,69,19,0.5)",
                      }}
                    />
                  )}
                </AnimatePresence>

                {/* Hover glow effect */}
                <AnimatePresence>
                  {hoveredItem === item.text && (
                    <MotionBox
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                      sx={{
                        position: "absolute",
                        inset: 4,
                        borderRadius: 2,
                        background: "rgba(139,69,19,0.08)",
                        pointerEvents: "none",
                      }}
                    />
                  )}
                </AnimatePresence>

                <Tooltip
                  title={
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.text}
                    </motion.span>
                  }
                  placement="right"
                  arrow
                >
                  <MotionListItemButton
                    component={Link}
                    to={item.to}
                    className={`nav-button ${isActive ? "active" : ""}`}
                    whileHover="hover"
                    whileTap="tap"
                    initial="rest"
                    animate="rest"
                    sx={{
                      justifyContent: "center",
                      py: 1.5,
                      borderRadius: 2,
                      mx: 1,
                      transition: "background-color 0.2s ease",
                    }}
                  >
                    <ListItemIcon
                      className="nav-icon"
                      sx={{
                        minWidth: "auto",
                        justifyContent: "center",
                        position: "relative",
                      }}
                    >
                      <motion.div
                        variants={iconHoverVariants}
                        style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                      >
                        <HugeiconsIcon
                          icon={item.icon}
                          size={24}
                          style={{
                            color: isActive ? "#8B4513" : "#666",
                            transition: "color 0.2s ease",
                          }}
                        />
                      </motion.div>

                      {/* Active pulse effect */}
                      {isActive && (
                        <MotionBox
                          variants={pulseVariants}
                          initial="initial"
                          animate="animate"
                          sx={{
                            position: "absolute",
                            inset: -8,
                            borderRadius: "50%",
                            border: "2px solid rgba(139,69,19,0.3)",
                            pointerEvents: "none",
                          }}
                        />
                      )}
                    </ListItemIcon>
                  </MotionListItemButton>
                </Tooltip>
              </MotionListItem>
            );
          })}
        </List>

        {/* Logout Button */}
        <MotionListItem
          disablePadding
          variants={itemVariants}
          sx={{ position: "relative" }}
          onHoverStart={() => setIsLogoutHovered(true)}
          onHoverEnd={() => setIsLogoutHovered(false)}
        >
          {/* Logout hover glow */}
          <AnimatePresence>
            {isLogoutHovered && (
              <MotionBox
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                sx={{
                  position: "absolute",
                  inset: 4,
                  borderRadius: 2,
                  background: "rgba(220,53,69,0.08)",
                  pointerEvents: "none",
                }}
              />
            )}
          </AnimatePresence>

          <Tooltip
            title={
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                Logout
              </motion.span>
            }
            placement="right"
            arrow
          >
            <MotionListItemButton
              onClick={() => {
                if (onLogout) onLogout();
              }}
              className="nav-button logout-button"
              whileHover="hover"
              whileTap={{ scale: 0.9 }}
              initial="rest"
              animate="rest"
              sx={{
                justifyContent: "center",
                py: 1.5,
                borderRadius: 2,
                mx: 1,
              }}
            >
              <ListItemIcon
                className="nav-icon"
                sx={{ minWidth: "auto", justifyContent: "center" }}
              >
                <motion.div
                  variants={logoutIconVariants}
                  style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  <HugeiconsIcon
                    icon={Logout01Icon}
                    size={24}
                    style={{
                      color: isLogoutHovered ? "#dc3545" : "#666",
                      transition: "color 0.2s ease",
                    }}
                  />
                </motion.div>
              </ListItemIcon>
            </MotionListItemButton>
          </Tooltip>
        </MotionListItem>
      </MotionBox>
    </Drawer>
  );
};

export default Navbar;