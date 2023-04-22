import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import BookForm from "../BookForm";
import { motion, AnimatePresence } from "framer-motion";
import SnackBar from "../SnackBar";

const EditBook = ({ bookData }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const errorPUT = useSelector((state) => state.put.error);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleEdit = () => {
    setOpen(true);
  };
  return (
    <>
      <Button
        component={motion.div}
        whileTap={{ scale: 0.7, transition: { duration: 0.3 } }}
        whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
        onClick={handleEdit}
        sx={{ mr: 1 }}
      >
        <EditIcon /> &nbsp; Edit
      </Button>
      <AnimatePresence mode="wait" initial={false}>
        {open && (
          <BookForm
            bookData={bookData}
            onClose={() => setOpen(false)}
            open={open}
            method="PUT"
            openSnackbar={() => setSnackbarOpen(true)}
          />
        )}
      </AnimatePresence>
      <SnackBar
        open={snackbarOpen}
        handleClose={handleSnackbarClose}
        message={errorPUT ? errorPUT : "Book updated successfully"}
        severity={errorPUT ? "warning" : "success"}
      />
    </>
  );
};

export default EditBook;