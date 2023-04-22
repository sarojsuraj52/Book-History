import React from "react";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { bookAction } from "../store/bookSlice";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Button } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";

// const data = [
//     { id: 1, name: 'Apple' },
//     { id: 2, name: 'Banana' },
//     { id: 3, name: 'Cherry' },
//     { id: 4, name: 'Date' },
//     { id: 5, name: 'Elderberry' },
//   ];

const SearchBar = () => {
  const [searchText, setSearch] = React.useState("");
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    if (event && event.target) {
      setSearch(event.target.value);
    }
    dispatch(bookAction.search(searchText));
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && searchText.length !== 0) {
      handleSubmit();
    }
  };

  const clearFilter = ()=>{
    dispatch(bookAction.clearFilter());
  }
  const handleClearFilter = () => {
    dispatch(bookAction.clearFilter());
    setSearch('')
  };

  React.useEffect(() => {
    if (searchText.length === 0) {
      clearFilter()
    } else {
      clearFilter()
      handleSubmit();
    }
  }, [searchText]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          my: 4,
          mx: 2,
          border: " 1px solid grey",
          borderRadius: 2,
        }}
      >
        <InputBase
          onChange={(e) => handleSubmit(e)}
          value={searchText}
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          sx={{ ml: 1, flex: 1 }}
          onKeyDown={handleKeyDown}
        />
        <IconButton size="medium" onClick={handleSubmit}>
          <SearchIcon />
        </IconButton>
      </Box>
      <AnimatePresence>
        {searchText.length !== 0 && (
          <Button
            layout={true}
            component={motion.button}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            color="error"
            fullWidth
            style={{ justifyContent: "flex-start", marginBottom: 15 }}
            size="large"
            onClick={handleClearFilter}
          >
            <HighlightOffIcon /> &nbsp;CLEAR SEARCH
          </Button>
        )}
      </AnimatePresence>
    </>
  );
};

export default SearchBar;
