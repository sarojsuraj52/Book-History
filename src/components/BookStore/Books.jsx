import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, CircularProgress } from "@material-ui/core";
// import { Pagination } from "@material-ui/lab";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useSelector } from "react-redux";
import noImage from "../../assets/noImage.png";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  title: {
    display: "flex",
    alignItems: "center",
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  search: {
    marginBottom: theme.spacing(3),
  },
  button: {
    marginLeft: theme.spacing(1),
  },
  loading: {
    display: "block",
    margin: "auto",
    marginTop: theme.spacing(3),
  },
  image: {
    width: "85%",
    height: "72% !important",
    marginBottom: theme.spacing(1),
    borderRadius: "5%",
  },
  bookTitle: {
    fontWeight: "bold",
    marginBottom: theme.spacing(1),
  },
  bookAuthor: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(2),
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

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * booksPerPage;
  const books = bookStoreData?.slice(startIndex, startIndex + booksPerPage);

  return (
    <div className={classes.root}>
      {bookStoreData?.length !== 0 && status == "loading" ? (
        <CircularProgress className={classes.loading} />
      ) : (
        <>
          <Grid container spacing={3}>
            {books?.map((book,index) => (
              <Grid
                component={motion.div}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ delay: index * 0.1 }}
                layout
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={book.id}
              >
                <Link to={`#`} className={classes.link}>
                  <img
                    src={book.volumeInfo.imageLinks?.thumbnail || noImage}
                    alt={book.volumeInfo.title}
                    className={classes.image}
                  />
                  <Typography variant="h6" className={classes.bookTitle}>
                    {book.volumeInfo.title}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    className={classes.bookAuthor}
                  >
                    {book.volumeInfo.authors?.join(", ")}
                  </Typography>
                </Link>
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
              Search Book
            </Typography>
          )}
        </>
      )}
    </div>
  );
};

export default Books;
