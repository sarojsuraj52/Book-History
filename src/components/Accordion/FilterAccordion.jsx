// import CommonAccordion from "../common/CommonAccordion";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
// import Button from "@mui/material/Button";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
// // import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
// import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import BookIcon from "@mui/icons-material/Book";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import PlayLessonIcon from "@mui/icons-material/PlayLesson";
// import { useDispatch } from "react-redux";
// import { bookActions } from "../../store/bookSlice";
// import React, { useState } from "react";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";


// const FilterAccordion = () => {
//   const [anchorE, setAnchorE] = useState(null);

  
//   const handleClick = (event) => {
//     setAnchorE(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorE(null);
//   };

//   return (
//     <div>
//     <IconButton
//       aria-controls="simple-menu"
//       aria-haspopup="true"
//       onClick={handleClick}
//     >
//       <MenuIcon />
//     </IconButton>
//     <Menu
//       id="simple-menu"
//       anchorE={anchorE}
//       open={Boolean(anchorE)}
//       onClose={handleClose}
//     >
//       <MenuItem >
//         {" "}
//         {/* <CalendarMonthIcon color="secondary" /> &nbsp;Date{" "} */}
//         Date
//       </MenuItem>
//     </Menu>
//   </div>
//   );
// };

// export default FilterAccordion;


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

function FilterAccordion() {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();

  const handleReadFilter = () => {
    dispatch(bookActions.filterRead());
  };
  const handleUnReadFilter = () => {
    dispatch(bookActions.filterUnRead());
  };
  const handleReadingFilter = () => {
    dispatch(bookActions.filterReading());
  };
  const handleClearFilter = () => {
    dispatch(bookActions.clearFilter());
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
        <FilterAltIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleReadFilter}>
          <BookIcon color="primary" /> 
          <span>
            &nbsp; Read
          </span>
        </MenuItem>
        <MenuItem onClick={handleUnReadFilter}>
          <AutoStoriesIcon color="secondary" /> 
          <span>
            &nbsp; Unread
          </span>
        </MenuItem>
        <MenuItem onClick={handleReadingFilter}>
          <PlayLessonIcon color="info" /> 
          <span>
            &nbsp; Unread
          </span>
        </MenuItem>
        <MenuItem onClick={handleClearFilter}>
          <HighlightOffIcon color="error" /> 
          <span>
            &nbsp; Clear Filter
          </span>
        </MenuItem>
        
      </Menu>
    </div>
  );
}

export default FilterAccordion;

