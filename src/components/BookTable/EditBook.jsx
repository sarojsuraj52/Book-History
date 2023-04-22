import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import BookForm from "../BookForm";
import { motion, AnimatePresence } from "framer-motion";

const EditBook = ({ bookData }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const handleEdit = () => {
    setOpen(true);
  };
  return (
    <>
      <Button
        component={motion.div}
        whileTap={{ scale: 0.7, transition: { duration: 0.3 } }}
        whileHover={{scale:1.1, transition: { duration: 0.2 } }}
        onClick={handleEdit}
        sx={{mr:1}}
      >
        <EditIcon /> &nbsp; Edit
      </Button>
      <AnimatePresence mode="wait" initial={false}>
        {open && <BookForm
          bookData={bookData}
          onClose={() => setOpen(false)}
          open={open}
          method="PUT"
        />}
      </AnimatePresence>
    </>
  );
};

export default EditBook;
