import React from "react";
import CommonAccordion from "../common/CommonAccordion";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Button from "@mui/material/Button";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import BookIcon from "@mui/icons-material/Book";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import PlayLessonIcon from "@mui/icons-material/PlayLesson";
import { useDispatch } from "react-redux";
import { bookActions } from "../../store/bookSlice";

const bookGenres = [
  "Fiction",
  "Non-fiction",
  "Mystery",
  "Thriller",
  "Romance",
  "Fantasy",
  "Science fiction",
  "Horror",
  "Historical fiction",
  "Biography",
  "Autobiography",
  "Memoir",
  "Cookbooks",
  "Travel",
  "Self-help",
  "Business",
  "Young adult",
  "Children",
  "Poetry",
  "Drama",
  "Comedy",
];

const FilterAccordion = () => {
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

  return (
    <CommonAccordion heading="Filter" icon={<FilterAltIcon />}>
      <Button
        color="inherit"
        fullWidth
        style={{
          marginBottom: "5px",
          textTransform: "none",
          justifyContent: "flex-start",
          fontWeight:600
        }}
        size="large"
        onClick={handleReadFilter}
      >
        <BookIcon color="primary"/> &nbsp;Read
      </Button>
      <Button
        color="inherit"
        fullWidth
        style={{
          marginBottom: "5px",
          textTransform: "none",
          justifyContent: "flex-start",
          fontWeight:600
        }}
        size="large"
        onClick={handleUnReadFilter}
      >
        <PlayLessonIcon color="warning" /> &nbsp;Unread
      </Button>
      <Button
        color="inherit"
        fullWidth
        style={{
          marginBottom: "5px",
          textTransform: "none",
          justifyContent: "flex-start",
          fontWeight:600
        }}
        size="large"
        onClick={handleReadingFilter}
      >
        <AutoStoriesIcon color="secondary"/> &nbsp;Reading
      </Button>
      <Button
        color="error"
        fullWidth
        style={{
          marginBottom: "5px",
          textTransform: "none",
          justifyContent: "flex-start",
          fontWeight:600
        }}
        size="large"
        onClick={handleClearFilter}
      >
        <HighlightOffIcon /> &nbsp;Clear Filter
      </Button>
    </CommonAccordion>
  );
};

export default FilterAccordion;
