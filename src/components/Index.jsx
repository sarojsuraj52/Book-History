import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Box, Typography } from "@mui/material";
import { Button } from "@mui/material";
import BookForm from "./BookForm";
import BookTable from "./BookTable/BookTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../store/bookSlice";
import Footer from "./Footer";
import { AnimatePresence, motion } from "framer-motion";
import SnackBar from "./SnackBar";

const Index = () => {
  const [openCommonModal, setCommonModal] = React.useState(false);
  const booksArray = useSelector((state) => state.books.booksArray);
  const deletedBookId = useSelector((state) => state.delete.data);
  const addedBookId = useSelector((state) => state.post.data);
  const editBookId = useSelector((state) => state.put.data);
  const errorPOST = useSelector((state) => state.post.error);

  const dispatch = useDispatch();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  useEffect(() => {
    dispatch(fetchBooks());
  }, [deletedBookId, addedBookId, editBookId]);
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 5,
        }}
      >
        <Typography sx={{ mb: 4 }} component="h1" variant="h4">
          Book List
        </Typography>
        <BookTable bookData={booksArray} />
        <Button
          component={motion.div}
          whileTap={{ scale: 0.7, transition: { duration: 0.2 } }}
          whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
          size="large"
          variant="contained"
          color="success"
          onClick={() => setCommonModal(true)}
        >
          Add Book
        </Button>
      </Box>
      <AnimatePresence mode="wait">
        {openCommonModal && (
          <BookForm
            open={openCommonModal}
            onClose={() => setCommonModal(false)}
            method="POST"
            openSnackbar={() => setSnackbarOpen(true)}
          />
        )}
      </AnimatePresence>
      <Footer />
      <SnackBar
        open={snackbarOpen}
        handleClose={handleSnackbarClose}
        message={errorPOST ? errorPOST : "Book added successfully"}
        severity={errorPOST ? "warning" : "success"}
      />
    </>
  );
};

export default Index;
