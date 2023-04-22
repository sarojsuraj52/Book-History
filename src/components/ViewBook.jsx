import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, Dialog, Typography } from "@material-ui/core";
import CommonModal from "./common/CommonModal";

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: "bold",
    marginBottom: theme.spacing(2),
  },
  subtitle: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(2),
    fontFamily: "Segoe UI",
  },
  label: {
    fontWeight: "bold",
    marginRight: theme.spacing(1),
  },
  value: {
    marginBottom: theme.spacing(1),
  },
}));

const ViewBook = ({ book, onClose, open }) => {
  const classes = useStyles();
  if (!book) {
    return null;
  }
 
  return (
    <CommonModal  onClose={onClose} open={open} >
      <Box sx={{ p: 0 }}>
        <Typography component="h2" variant="h5" className={classes.title}>
          {book.title}
        </Typography>
        <Typography className={classes.subtitle}>{book.author}</Typography>
        <Typography className={classes.value}>
          <span className={classes.label}>Publisher:</span>
          {book.publisher}
        </Typography>
        <Typography className={classes.value}>
          <span className={classes.label}>Genre:</span>
          {book.genre}
        </Typography>
        <Typography className={classes.value}>
          <span className={classes.label}>Publication Date:</span>
          {new Date(book.publicationDate).toLocaleDateString()}
        </Typography>
        <Typography className={classes.value}>
          <span className={classes.label}>Pages:</span>
          {book.pages}
        </Typography>
        <Typography className={classes.value}>
          <span className={classes.label}>Reading Status:</span>
          {book.readingStatus}
        </Typography>
        {book.readingStatus === "reading" && (
          <React.Fragment>
            <Typography className={classes.value}>
              <span className={classes.label}>Current Page:</span>
              {book.currentPage}
            </Typography>
            <Typography className={classes.value}>
              <span className={classes.label}>Start Date:</span>
              {new Date(book.startDate).toLocaleDateString()}
            </Typography>
          </React.Fragment>
        )}
        {book.readingStatus === "read" && (
          <React.Fragment>
            <Typography className={classes.value}>
              <span className={classes.label}>Start Date:</span>
              {new Date(book.startDate).toLocaleDateString()}
            </Typography>
            <Typography className={classes.value}>
              <span className={classes.label}>End Date:</span>
              {new Date(book.endDate).toLocaleDateString()}
            </Typography>
          </React.Fragment>
        )}
        <Typography className={classes.value}>
              <span className={classes.label}>Source:</span>
              {book.source}
            </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1.5 }}>
        <Button onClick={onClose} color="secondary" variant="contained">
          Close
        </Button>
      </Box>
    </CommonModal>
  );
};

export default ViewBook;