import React from "react";
import { Typography } from "@mui/material";
import { Link } from "@mui/material";

const Footer = () => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      sx={{
        position: "fixed",
        bottom: 0,
        left:0,
        right:0,
        width: "100%",
        minHeight:'30px'
      }}
    >
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://www.zconsolutions.com/"
        target="_blank"
      >
        zCon Solutions
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default Footer;
