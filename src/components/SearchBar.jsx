import React from "react";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

// const data = [
//     { id: 1, name: 'Apple' },
//     { id: 2, name: 'Banana' },
//     { id: 3, name: 'Cherry' },
//     { id: 4, name: 'Date' },
//     { id: 5, name: 'Elderberry' },
//   ];

const SearchBar = () => {
  const [search, setSearch] = React.useState("");
  const [filteredData, setFilteredData] = React.useState([]);


  const handleSubmit = (e)=>{
    const filtered = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  search && setFilteredData(filtered);
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && search.length !== 0) {
        handleSubmit();
    }

  };
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
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        sx={{ ml: 1, flex: 1 }}
        onKeyDown={handleKeyDown}
        />
      <IconButton size="medium" onClick={handleSubmit}>
        <SearchIcon />
      </IconButton>
    </Box>
    {filteredData.map(e=>{
        return <h2>{e.name}</h2>
    })}
    </>
  );
};

export default SearchBar;
