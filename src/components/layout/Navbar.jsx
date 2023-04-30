import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import TableChartIcon from "@mui/icons-material/TableChart";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { AnimatePresence } from "framer-motion";
import { Button } from "@material-ui/core";

// const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Logout"];

function Navbar() {
  const [state, setState] = useState({
    openSidebar: false,
  });
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userEmail = useSelector((state) => state.auth.userEmail);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    dispatch(authActions.logout());
    navigate("/auth");
  };

  const showDrawer = (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ openSidebar: true });
  };

  return (
    <AppBar
      position="relative"
      sx={{ zIndex: 1000, backgroundColor: "#038aff " }}
    >
      <Toolbar
        disableGutters
        sx={{
          display: "flex",
          justifyContent: "space-between",
          pr: { xs: 2, md: 3, lg: 4 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button onClick={() => setState({ openSidebar: true })}>
            <MenuIcon style={{ color: "white" ,marginBottom:'2px'}} />
          </Button>
          <Sidebar
            open={state.openSidebar}
            onOpen={showDrawer}
            onClose={() => setState({ openSidebar: false })}
          />
          <TableChartIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 ,mb:0.5}} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            style={{
              marginRight: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
              fontFamily: "sans-serif",
              letterSpacing:2
            }}
          >
            BookHistory
          </Typography>
        </Box>

        <Box
          sx={{
            flexGrow: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography sx={{ pr: 2, display: { xs: "none", sm: "flex" } }}>
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Typography>
          <Typography sx={{ pr: 2, display: { xs: "none", sm: "flex" } }}>
            {"SURAJ SAROJ"}
          </Typography>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt={userEmail || "user"} src="/" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px", width: "100% !important" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography textAlign="center">Profile</Typography>
            </MenuItem>
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography textAlign="center">Setting</Typography>
            </MenuItem>
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography onClick={handleLogout}>Logout</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
      {/* </Container> */}
    </AppBar>
  );
}
export default Navbar;
