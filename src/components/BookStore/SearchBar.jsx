import React, { useState, useEffect } from "react";
import { InputBase } from "@material-ui/core";
import { Box } from "@material-ui/core";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar({ search }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    search(searchTerm);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  // useEffect(() => {
  //   if (searchTerm.length > -1) {
  //     handleSearch();
  //   }
  // }, [searchTerm]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "fit-content",
        pl: 3,
        mx: "auto",
        my: 5,
        border: "1px solid #038aff",
        borderRadius: 5,
      }}
    >
      <InputBase
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        sx={{ ml: 1, flex: 1 }}
        onKeyDown={handleKeyDown}
      />
      <IconButton
        style={{ backgroundColor: "#038aff", borderRadius: 0, color: "white" }}
        size="large !important"
        onClick={handleSearch}
      >
        <SearchIcon />
      </IconButton>
    </Box>
  );
}
