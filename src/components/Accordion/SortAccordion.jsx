import React, { useState } from "react";
import CommonAccordion from "../common/CommonAccordion";
import SortIcon from "@mui/icons-material/Sort";
import Button from '@mui/material/Button';
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useDispatch } from "react-redux";
import { bookAction } from "../../store/bookSlice";

const SortAccordion = () => {
  const dispatch = useDispatch();
  const [isTitleAscending, setIsTitleAscending] = useState(true);
  const [isDateAscending, setIsDateAscending] = useState(true);

  const handleSortByTitle = () => {
    setIsTitleAscending((prev) => !prev);
    dispatch(bookAction.sortByTitle(isTitleAscending));
  };
  
  const handleSortByPublicationDate = () => {
    setIsDateAscending((prev) => !prev);
    dispatch(bookAction.sortByPublicationDate(isDateAscending));
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
        }}
        size="large"
        onClick={handleSortByTitle}
      >
        <SortByAlphaIcon /> &nbsp;
        <span>
          TITLE {`(${isTitleAscending ?'isDescending': "isAscending" })`}
        </span>
      </Button>
      <Button
      color="inherit"
        fullWidth
        style={{
          justifyContent: "flex-start",
          marginBottom: "5px",
          textTransform: "none",
        }}
        size="large"
        onClick={handleSortByPublicationDate}
      >
        <CalendarMonthIcon /> &nbsp;Date {`(${isDateAscending ?'isDescending': "isAscending" })`}
      </Button>
    </CommonAccordion>
  );
};

export default SortAccordion;
