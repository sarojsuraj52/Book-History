import React, { useState, useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, CircularProgress, Box } from "@material-ui/core";
import { Button } from "@mui/material";
import { Divider } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useSelector } from "react-redux";
import noImage from "../../assets/noImage.png";
import "./Book.css";
import { useMediaQuery } from "@material-ui/core";

const Books = ({ bookStoreData, query }) => {
  const isSmallScreen = useMediaQuery("(max-width: 600px)");
  const isMediumScreen = useMediaQuery("(max-width: 960px)");
  const isMediumUpperScreen = useMediaQuery("(max-width: 1200px)");
  const divRef = useRef(null);

  const handleClick = (id) => {
    const element = document.getElementById(id);
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = window.pageYOffset;
    const scrollPosition = elementPosition  + offsetPosition;

    window.scrollTo({
      top: scrollPosition + scrollPosition,
      behavior: "smooth",
    });
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: isSmallScreen ? "0" : "5rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    },
    title: {
      display: "flex",
      alignItems: "center",
      fontSize: "3rem",
    },
    loading: {
      display: "block",
      margin: "auto",
      marginTop: theme.spacing(25),
    },
    bookTitle: {
      fontWeight: "bold",
      fontSize: isMediumScreen
        ? "0.88rem"
        : isSmallScreen
        ? "0.8rem"
        : "1.2rem",
      marginTop: isSmallScreen ? "1rem" : "0",
    },
    bookAuthor: {
      color: theme.palette.text.secondary,
      marginBottom: theme.spacing(1),
      fontSize: isMediumScreen
        ? "0.75rem"
        : isSmallScreen
        ? "0.85rem"
        : "0.98rem",
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
          sx={{ my: isSmallScreen ? 3 : 0 }}
        >
          Close Book
        </Button>
      )}
      {bookStoreData?.length !== 0 && status == "loading" ? (
        <CircularProgress className={classes.loading} size={60} />
      ) : (
        <>
          <Grid
            container
            style={{
              display: "flex",
              justifyContent: "center",
              width: isSmallScreen
                ? "100%"
                : isMediumUpperScreen
                ? "100%"
                : "80%",
              textAlign: "center",
            }}
          >
            {books?.map((book, index) => (
              <Grid
                id={book.id}
                className="book-container"
                component={motion.div}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{
                  delay: index * 0.1,
                  layout: { duration: 0.7, type: "spring", damping: 17 },
                }}
                layout="position"
                item
                xs={selectedBook && selectedBook.id === book.id ? 12 : 4}
                sm={selectedBook && selectedBook.id === book.id ? 12 : 4}
                md={selectedBook && selectedBook.id === book.id ? 12 : 2}
                key={book.id}
                onClick={() => {
                  setSelectedBook(book);
                  handleClick(book.id);
                }}
                style={{
                  margin: isSmallScreen
                    ? selectedBook && selectedBook.id === book.id
                      ? "3rem 1.5rem"
                      : "1rem"
                    : "3rem",
                  marginBottom: isSmallScreen ? "3rem" : "5rem",
                  borderRadius: "15px",
                  padding:
                    selectedBook && selectedBook.id === book.id ? "15px" : "",
                  boxShadow:
                    "0px 0px 0px 0px rgba(0,0,0,0.2), 0px 0px 0px 0px rgba(0,0,0,0.14), 0px 4px 20px 0px rgba(0,0,0,0.12)",
                }}
              >
                <div
                  style={{
                    borderRadius: "15px 15px 0 0",
                    overflow: "hidden",
                  }}
                >
                  <motion.img
                    layout="position"
                    src={book.volumeInfo.imageLinks?.thumbnail || noImage}
                    alt={book.volumeInfo.title}
                    className={classes.image}
                    style={{
                      width: "100%",
                      aspectRatio: 3 / 3,
                      objectFit:
                        selectedBook && selectedBook.id === book.id
                          ? "contain"
                          : "cover",
                      height: "auto",
                      minHeight: isSmallScreen ? "150px" : "280px",
                      marginBottom: isSmallScreen ? "0" : "1rem",
                      maxWidth:
                        selectedBook && selectedBook.id === book.id
                          ? "300px"
                          : "none",
                    }}
                  />
                </div>
                <Typography
                  component={motion.p}
                  layout="position"
                  variant="h6"
                  className={classes.bookTitle}
                  style={{ marginTop: isSmallScreen ? "0.8rem" : "0" }}
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

                <AnimatePresence mode="wait">
                  {selectedBook && selectedBook.id === book.id && (
                    <Box
                      style={{
                        marginBottom: "30px",
                        textAlign: "start",
                        padding: "15px",
                      }}
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
                      <Typography
                        variant="subtitle1"
                        style={{ wordBreak: "break-all" }}
                      >
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
