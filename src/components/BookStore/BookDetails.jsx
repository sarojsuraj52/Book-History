import React from "react";
import { Typography, Button } from "@material-ui/core";

const BookDetails = ({ book, onClose }) => {
  return (
    <div>
      <Typography variant="h4">{book.volumeInfo.title}</Typography>
      <Typography variant="subtitle1">
        Average Rating: {book.volumeInfo.averageRating}
      </Typography>
      <Typography variant="subtitle1">
        Page Count: {book.volumeInfo.pageCount}
      </Typography>
      <Typography variant="body1">{book.volumeInfo.description}</Typography>
      <Button variant="contained" color="primary" onClick={onClose}>
        Close
      </Button>
    </div>
  );
};

export default BookDetails;
