import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { deleteBook } from "../../store/DELETESlice";
import { motion } from "framer-motion";

const DeleteBook = ({ id,openSnackbar }) => {

  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteBook(id));
    openSnackbar()
  };
  return (
    <>
      <Button
        component={motion.div}
        whileTap={{ scale: 0.7, transition: { duration: 0.3 } }}
        whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
        onClick={handleDelete}
        color="error"
        sx={{display:'flex',justifyContent:'center',alignItems:'center'}}
      >
        <DeleteIcon /> &nbsp; Delete
      </Button>
    </>
  );
};

export default DeleteBook;
