import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Paper from "@mui/material/Paper";
import Divider from "@material-ui/core/Divider";
import { NavLink, useLocation } from "react-router-dom";
import Box from "@mui/material/Box/Box";
import { Typography } from "@material-ui/core";
import BookIcon from "@mui/icons-material/Book";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ViewStreamIcon from "@mui/icons-material/ViewStream";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import "./Sidebar.css";

const Sidebar = ({ open, onOpen, onClose }) => {

  return (
    <>
      <SwipeableDrawer
        sx={{ overflow: "hidden" }}
        open={open}
        onOpen={onOpen}
        onClose={onClose}
      >
        <Paper
          elevation={0}
          layout
          sx={{ overflow: "hidden" }}
          component={motion.div}
          animate={{
            opacity: open ? 1 : 0,
            x: open ? 0 : -40,
          }}
          transition={{ type: "spring", damping: 9 }}
        >
          <div style={{ width: 270 }} role="presentation">
            <Typography
              color="primary"
              style={{
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                margin: "20px 0",
                padding: "5px",
                color:'#038aff'
              }}
              variant="h4"
            >
              <BookIcon fontSize=""  /> BookHistory
            </Typography>
            <Divider />
            <Box
            className='nav'
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                mt: 10,
                fontFamily: "sans-serif",
              }}
            >
              <NavLink
                to="/"
                className='link'
              >
                <DashboardIcon /> &nbsp;&nbsp;Dashboard
              </NavLink>
              <NavLink
                to="/bookList"
                className='link'
              >
                <ViewStreamIcon /> &nbsp;&nbsp;Book List
              </NavLink>
              <NavLink
                to="/bookStore"
                className='link'
              >
                <LocalMallIcon /> &nbsp;&nbsp;Book Store
              </NavLink>
            </Box>
          </div>
        </Paper>
      </SwipeableDrawer>
    </>
  );
};

export default Sidebar;
