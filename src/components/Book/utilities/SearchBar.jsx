import React from "react";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { bookActions } from "../../../store/bookSlice";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Button } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";

const SearchBar = () => {
  const [searchText, setSearch] = React.useState("");
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    if (event && event.target) {
      setSearch(event.target.value);
    }
    dispatch(bookActions.search(searchText));
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && searchText.length !== 0) {
      handleSubmit();
    }
  };

  const clearFilter = () => {
    dispatch(bookActions.clearFilter());
  };
  const handleClearFilter = () => {
    dispatch(bookActions.clearFilter());
    setSearch("");
  };

  React.useEffect(() => {
    if (searchText.length === 0) {
      clearFilter();
    } else {
      clearFilter();
      handleSubmit();
    }
  }, [searchText]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mx: 1,
          border: "1px solid grey",
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
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            color="error"
            fullWidth
            style={{ justifyContent: "center",height:'40px',width:'100px'}}
            size="large"
            onClick={handleClearFilter}
          >
            <HighlightOffIcon /> &nbsp;CLEAR 
          </Button>
        )}
      </AnimatePresence>
    </>
  );
};

export default SearchBar;
