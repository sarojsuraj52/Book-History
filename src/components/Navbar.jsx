import * as React from "react";
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
import {authAction} from '../store/authSlice';
import { useNavigate} from "react-router-dom";
import Sidebar from "./Sidebar";

// const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Logout"];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userName = useSelector(state=> state.auth.userName)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = ()=>{
    dispatch(authAction.logout())
    navigate('/auth')
  }

  return (
    <AppBar position="static">
      {/* <Container > */}
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" ,px:5}}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Sidebar />
            <TableChartIcon
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              App
            </Typography>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            App
          </Typography>

          <Box sx={{ flexGrow: 0 , display:'flex', justifyContent:'center',alignItems:'center'}}>
            <Typography sx={{pr:2, display:{xs:'none', sm:'flex'}}}>{new Date().toLocaleDateString('en-US',{ year: 'numeric', month: 'long', day: 'numeric' })}</Typography>
            <Typography sx={{pr:2, display:{xs:'none', sm:'flex'}}}>{userName.toUpperCase()}</Typography>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={userName || 'user'} src="/" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
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
                <Typography  onClick={handleLogout}>Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      {/* </Container> */}
    </AppBar>
  );
}
export default Navbar;
