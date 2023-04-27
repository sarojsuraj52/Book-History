import React, { useState } from "react";
import CommonAccordion from "../common/CommonAccordion";
import SortIcon from "@mui/icons-material/Sort";
import Button from "@mui/material/Button";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useDispatch, useSelector } from "react-redux";
import { bookActions } from "../../store/bookSlice";

const SortAccordion = () => {
  const dispatch = useDispatch();
  const [isTitleAscending, setIsTitleAscending] = useState(true);
  const [isDateAscending, setIsDateAscending] = useState(true);
  const booksArray = useSelector((state) => state.books.booksArray);
  // console.log(booksArray.map(e=>e).sort((a,b)=>a[1].title.localeCompare(b[1].title)))
  
  const handleSortByTitle = () => {
    setIsTitleAscending((prev) => !prev);
    dispatch(bookActions.sortByTitle(isTitleAscending));
  };

  const handleSortByPublicationDate = () => {
    setIsDateAscending((prev) => !prev);
    dispatch(bookActions.sortByPublicationDate(isDateAscending));
  };
  return (
    <CommonAccordion heading="Sort" icon={<SortIcon />}>
      <Button
        color="inherit"
        fullWidth
        style={{
          justifyContent: "flex-start",
          marginBottom: "5px",
          textTransform: "none",
          fontWeight:550
        }}
        size="large"
        onClick={handleSortByTitle}
      >
        <SortByAlphaIcon color='primary'/> &nbsp;
        <span>
          Title {`(${isTitleAscending ? "isDescending" : "isAscending"})`}
        </span>
      </Button>
      <Button
        color="inherit"
        fullWidth
        style={{
          justifyContent: "flex-start",
          marginBottom: "5px",
          textTransform: "none",
          fontWeight:600
        }}
        size="large"
        onClick={handleSortByPublicationDate}
      >
        <CalendarMonthIcon color="secondary" /> &nbsp;Date{" "}
        {`(${isDateAscending ? "isDescending" : "isAscending"})`}
      </Button>
    </CommonAccordion>
  );
};

export default SortAccordion;
