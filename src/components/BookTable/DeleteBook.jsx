import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { DELETEAction, deleteBook } from "../../store/DELETESlice";
import { motion } from "framer-motion";

const DeleteBook = ({ id, openSnackbar }) => {
  const dispatch = useDispatch();
  const errorDELETE = useSelector((state) => state.delete.error);

  const handleDelete = () => {
    dispatch(deleteBook(id));
    !errorDELETE && dispatch(DELETEAction.updateId(id));
    openSnackbar();
  };
  return (
    <div>
      <Button
        component={motion.div}
        whileTap={{ scale: 0.7, transition: { duration: 0.3 } }}
        whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
        onClick={handleDelete}
        color="error"
      >
        <DeleteIcon /> &nbsp; <span>Delete</span>
      </Button>
    </div>
  );
};

export default DeleteBook;
