import React from "react";
import CommonAccordion from "../common/CommonAccordion";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Button from '@mui/material/Button';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import BookIcon from "@mui/icons-material/Book";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import PlayLessonIcon from "@mui/icons-material/PlayLesson";
import { useDispatch } from "react-redux";
import { bookAction } from "../../store/bookSlice";


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
    dispatch(bookAction.filterRead());
  };
  const handleUnReadFilter = () => {
    dispatch(bookAction.filterUnRead());
  };
  const handleReadingFilter = () => {
    dispatch(bookAction.filterReading());
  };
  const handleClearFilter = () => {
    dispatch(bookAction.clearFilter());
  };

  return (
    <CommonAccordion heading="Filter" icon={<FilterAltIcon />}>
      <Button
      color="inherit"
        fullWidth
        style={{ justifyContent: "flex-start", marginBottom: "5px" }}
        size="large"
        onClick={handleReadFilter}
      >
        <BookIcon /> &nbsp;READ
      </Button>
      <Button
      color="inherit"
        fullWidth
        style={{ justifyContent: "flex-start" }}
        size="large"
        onClick={handleUnReadFilter}
      >
        <PlayLessonIcon /> &nbsp;UNREAD
      </Button>
      <Button
      color="inherit"
        fullWidth
        style={{ justifyContent: "flex-start" }}
        size="large"
        onClick={handleReadingFilter}
      >
        <AutoStoriesIcon /> &nbsp;READING
      </Button>
      <Button
        color="error"
        fullWidth
        style={{ justifyContent: "flex-start" }}
        size="large"
        onClick={handleClearFilter}
      >
        <HighlightOffIcon /> &nbsp;CLEAR FILTER
      </Button>
    </CommonAccordion>
  );
};

export default FilterAccordion;
