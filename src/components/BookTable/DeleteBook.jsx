import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { deleteBook } from "../../store/DELETESlice";
import { motion } from "framer-motion";

const DeleteBook = ({ id }) => {
  const errorDELETE = useSelector((state) => state.delete.error);
  const error = useSelector((state) => state.delete.error);

  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteBook(id));
    if (error) {
      alert("Failed to Delete Book: " + error);
    } else {
      alert("Book deleted successfully.");
    }
  };
  return (
    <Button
      component={motion.div}
      whileTap={{ scale: 0.7, transition: { duration: 0.3 } }}
      whileHover={{scale:1.1, transition: { duration: 0.2 } }}
      onClick={handleDelete}
      color="error"
    >
      <DeleteIcon /> &nbsp; Delete
    </Button>
  );
};

export default DeleteBook;
