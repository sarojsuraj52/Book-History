import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { NavLink, useLocation } from "react-router-dom";
import Box from "@mui/material/Box/Box";
import { Typography } from "@material-ui/core";
import BookIcon from "@mui/icons-material/Book";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ViewStreamIcon from "@mui/icons-material/ViewStream";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import "./Sidebar.css";
import { useInView } from "react-intersection-observer";

const Sidebar = ({ open, onOpen, onClose }) => {
  return (
    <>
      <SwipeableDrawer
        role="okok"
        sx={{ overflow: "hidden" }}
        open={open}
        onOpen={onOpen}
        onClose={onClose}
      >
        <motion.div
          layout='position'
          animate={{
            opacity: open ? 1 : 0,
            x: open ? 0 : -50,
          }}
          transition={{ duration: 5, type: "spring", damping: 10 }}
          style={{ width: 270, overflow: "hidden" }}
          role="presentation"
          className="area"
        >
          <div
            style={{
              borderBottom: "1px solid lightgrey",
              backgroundColor: "white",
            }}
          >
            <Typography
              color="primary"
              style={{
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                margin: "10px 0",
                padding: "5px",
                color: "#038aff",
              }}
              variant="h4"
            >
              <BookIcon fontSize="" /> BookHistory
            </Typography>
          </div>
          {/* <Divider /> */}
          <Box
            className="nav"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              mt: 10,
              fontFamily: "sans-serif",
            }}
          >
            <motion.div
              whileHover={{
                boxShadow: "inset 300px 0 0 0 #2e9dff",
                color: "#FFF",
              }}
              transition={{ type: "spring", duration: 1, damping: 15 }}
              layout
              style={{
                color: "#000",
                marginTop: "8px",
              }}
            >
              <NavLink to="/" className="link">
                <DashboardIcon /> &nbsp;&nbsp;Dashboard
              </NavLink>
            </motion.div>

            <motion.div
              whileHover={{
                boxShadow: "inset 300px 0 0 0 #2e9dff",
                color: "#FFF", // set initial color to animatable value
              }}
              transition={{ type: "spring", duration: 1, damping: 15 }}
              layout
              style={{
                color: "#000", // set initial color to animatable value
                marginTop: "8px",
              }}
            >
              <NavLink to="/bookList" className="link">
                <ViewStreamIcon /> &nbsp;&nbsp;Book List
              </NavLink>
            </motion.div>
            <motion.div
              whileHover={{
                boxShadow: "inset 300px 0 0 0 #2e9dff",
                color: "#FFF", // set initial color to animatable value
              }}
              transition={{ type: "spring", duration: 1, damping: 15 }}
              layout
              style={{
                color: "#000", // set initial color to animatable value
                marginTop: "8px",
              }}
            >
              <NavLink to="/bookStore" className="link">
                <LocalMallIcon /> &nbsp;&nbsp;Book Store
              </NavLink>
            </motion.div>
          </Box>
          <ul className="circles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </motion.div>
      </SwipeableDrawer>
    </>
  );
};

export default Sidebar;
