import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, CircularProgress, Box } from "@material-ui/core";
import { Button, duration } from "@mui/material";
// import { Pagination } from "@material-ui/lab";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useSelector } from "react-redux";
import noImage from "../../assets/noImage.png";
import './Book.css'

const useStyles = makeStyles((theme) => ({
  root: {
    // padding: theme.spacing(3),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  title: {
    display: "flex",
    alignItems: "center",
  },
  loading: {
    display: "block",
    margin: "auto",
    marginTop: theme.spacing(3),
  },
  bookTitle: {
    fontWeight: "bold",
  },
  bookAuthor: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
  pagination: {
    marginTop: theme.spacing(3),
    display: "flex",
    justifyContent: "center",
  },
}));

const Books = ({ bookStoreData, query }) => {
  const classes = useStyles();
  const status = useSelector((state) => state.bookStore.status);
  const [page, setPage] = useState(1);
  const booksPerPage = 10;
  const numPages = Math.ceil(bookStoreData?.length / booksPerPage);
  const [selectedBook, setSelectedBook] = useState(null);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * booksPerPage;
  const books = bookStoreData?.slice(startIndex, startIndex + booksPerPage);

  const [open, setOpen] = useState(false);

  return (
    <div className={classes.root}>
      {selectedBook && (
        <Button
          variant="contained"
          color="primary"
          component={motion.button}
          whileTap={{ scale: 0.7, transition: { duration: 0.3 } }}
          whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
          onClick={() => setSelectedBook(null)}
        >
          Close Book
        </Button>
      )}
      {bookStoreData?.length !== 0 && status == "loading" ? (
        <CircularProgress className={classes.loading} />
      ) : (
        <>
          <Grid
            container
            style={{
              display: "flex",
              justifyContent: "center",
              // width: "70%",
              textAlign: "center",
              maxHeight: "50%",
            }}
          >
            {books?.map((book, index) => (
              <Grid
                className="book-container"
                component={motion.div}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{
                  delay: index * 0.1,
                  layout: { duration: 0.7, type: "spring" },
                }}
                layout
                item
                xs={12}
                sm={selectedBook && selectedBook.id === book.id ? 12 : 4}
                // xs={12}
                md={selectedBook && selectedBook.id === book.id ? 12 : 2}
                key={book.id}
                onClick={() => setSelectedBook(book)}
                style={{
                  margin: 20,
                  borderRadius: "15px",
                  paddingTop: "15px",
                }}
              >
                <Link
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "2px",
                  }}
                  component={motion.a}
                  layout="position"
                  to={`#`}
                  className={classes.link}
                >
                  <motion.img
                    layout="position"
                    src={book.volumeInfo.imageLinks?.thumbnail || noImage}
                    alt={book.volumeInfo.title}
                    className={classes.image}
                    style={{
                      width: "70%",
                      height: "300px",
                      objectFit: "cover",
                      marginBottom: "1rem",
                      borderRadius: "5%",
                      maxWidth:
                        selectedBook && selectedBook.id === book.id
                          ? "208px"
                          : "none",
                    }}
                  />
                  <Typography
                    component={motion.p}
                    layout="position"
                    variant="h6"
                    className={classes.bookTitle}
                  >
                    {book.volumeInfo.title}
                  </Typography>
                  <Typography
                    component={motion.p}
                    layout="position"
                    variant="subtitle1"
                    className={classes.bookAuthor}
                  >
                    {book.volumeInfo.authors?.join(", ")}
                  </Typography>
                </Link>

                <AnimatePresence>
                  {selectedBook && selectedBook.id === book.id && (
                    <Box
                      style={{ marginBottom: "30px" ,textAlign:'start',padding:'15px'}}
                      component={motion.div}
                      initial={{ opacity: 0, y: -30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30 }}
                    >
                      <Typography variant="subtitle1">
                        <b>Description : </b>
                        {selectedBook.volumeInfo.description || "Not Available"}
                      </Typography>
                      <Typography variant="subtitle1">
                        <b>Average Rating: </b>
                        {selectedBook.volumeInfo.averageRating ||
                          "Not Available"}
                      </Typography>
                      <Typography variant="subtitle1">
                        <b>Page Count: </b>
                        {selectedBook.volumeInfo.pageCount || "Not Available"}
                      </Typography>
                      <Typography variant="subtitle1" style={{wordBreak:'break-all'}}>
                        <b>Preview: </b>
                        <a
                          href={selectedBook.volumeInfo.previewLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {selectedBook.volumeInfo.previewLink ||
                            "Not Available"}
                        </a>
                      </Typography>
                    </Box>
                  )}
                </AnimatePresence>
              </Grid>
            ))}
          </Grid>

          {bookStoreData?.length !== 0 ? (
            <Pagination
              className={classes.pagination}
              count={numPages}
              page={page}
              onChange={handlePageChange}
              renderItem={(item) => (
                <PaginationItem
                  slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                  {...item}
                />
              )}
              size="large"
            />
          ) : (
            <Typography
              style={{ fontSize: "2rem", color: "grey", marginTop: "4rem" }}
            >
              No Book Found
            </Typography>
          )}
        </>
      )}
    </div>
  );
};

export default Books;
