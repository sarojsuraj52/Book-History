// import React, { useState } from "react";
// import CommonAccordion from "../common/CommonAccordion";
import SortIcon from "@mui/icons-material/Sort";
import Button from "@mui/material/Button";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useDispatch, useSelector } from "react-redux";
import { bookActions } from "../../store/bookSlice";

import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

function IconMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isTitleAscending, setIsTitleAscending] = useState(true);
  const [isDateAscending, setIsDateAscending] = useState(true);
  const dispatch = useDispatch();

  const handleSortByTitle = () => {
    setIsTitleAscending((prev) => !prev);
    dispatch(bookActions.sortByTitle(isTitleAscending));
  };

  const handleSortByPublicationDate = () => {
    setIsDateAscending((prev) => !prev);
    dispatch(bookActions.sortByPublicationDate(isDateAscending));
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleSortByTitle}>
          <SortByAlphaIcon color="primary" /> 
          <span>
          &nbsp;Title {`(${isTitleAscending ? "isDescending" : "isAscending"})`}{" "}
          </span>
        </MenuItem>
        <MenuItem onClick={handleSortByPublicationDate} >
        <CalendarMonthIcon color="secondary" />
          <span>
           &nbsp;Date{" "}
          {`(${isDateAscending ? "isDescending" : "isAscending"})`}
          </span>
        </MenuItem>
      </Menu>
    </div>
  );
}

export default IconMenu;
