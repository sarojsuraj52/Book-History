import { Box } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SearchBar from "./SearchBar";
import { getStoreBooks } from "../../store/bookStoreSlice";
import { useSelector, useDispatch } from "react-redux";
import Books from "./Books";
import './BookStore.css'

const BookStore = (props) => {
  // console.log(data);
  
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const bookStoreData = useSelector((state) => state.bookStore.books) || [];

  // console.log(bookStoreData);

  useEffect(() => {
    dispatch(getStoreBooks(query));
  }, [query]);

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      sx={{ width: "100%" }}
    >
      <SearchBar search={(data) => setQuery(data)} />
      <Books bookStoreData={bookStoreData} query={query} />
    </Box>
  );
};

export default BookStore;
