import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import InfoIcon from "@mui/icons-material/Info";
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useMediaQuery } from "@mui/material";
import SnackBar from "../common/SnackBar";
import { useSelector, useDispatch } from "react-redux";
import ViewBook from "./ViewBook";
import EditBook from "./EditBook";
import DeleteBook from "./DeleteBook";
import { Typography } from "@material-ui/core";
import { Toolbar } from "@mui/material";
import { Tooltip } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { IconButton } from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import SearchBar from "./utilities/SearchBar";
import Sort from "./utilities/Sort";
import Filter from "./utilities/Filter";

function EnhancedTableToolbar(props) {
  return (
    <Toolbar
      sx={{
        px: { sm: 0, md: 2, lg: 4 },
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="h5" style={{ whiteSpace: "noWrap" }}>
        Book List
      </Typography>
      <Box sx={{ display: "flex" }}>
        <SearchBar />
        <Tooltip title="Sort List">
          <div>
            <Sort />
          </div>
        </Tooltip>
        <Tooltip title="Sort List">
          <div>
            <Filter />
          </div>
        </Tooltip>
      </Box>
    </Toolbar>
  );
}

const useStyles = makeStyles({
  tableCellHead: {
    fontWeight: 500,
    fontSize: "1.1rem",
  },
});

export default function BookTable({ bookData }) {
  if (!bookData) {
    return null;
  }
  const isMobile = useMediaQuery("(max-width:600px)");
  const classes = useStyles();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [page, setPage] = useState(1);
  const booksPerPage = 5;
  const numPages = Math.ceil(bookData.length / booksPerPage);
  const errorDELETE = useSelector((state) => state.delete.error);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleShowDetails = (book) => {
    setSelectedBook(book);
  };

  const handleCloseDetails = () => {
    setSelectedBook(null);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * booksPerPage;
  const books = bookData?.slice(startIndex, startIndex + booksPerPage);

  useEffect(() => {
    if (books.length === 0) {
      setPage((cur) => 1);
    }
  }, [books]);

  return (
    <>
      <TableContainer
        sx={{
          width: {
            xs: "100%",
            md: "85%",
            overflow: isMobile ? "auto" : "hidden",
          },
        }}
        component={Paper}
      >
        <EnhancedTableToolbar />
        <Table>
          {bookData.length !== 0 && (
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: "1.02rem" }}> SR.NO </TableCell>
                <TableCell sx={{ fontSize: "1.02rem" }}>Title</TableCell>
                <TableCell sx={{ fontSize: "1.02rem" }}>Publisher</TableCell>
                <TableCell sx={{ fontSize: "1.02rem" }}>Author</TableCell>
                <TableCell sx={{ fontSize: "1.02rem" }}>Pages</TableCell>
                <TableCell sx={{ fontSize: "1.02rem" }}>Genre</TableCell>
                <TableCell sx={{ fontSize: "1.02rem" }} align="center">
                  View More
                </TableCell>
                <TableCell
                  sx={{ fontSize: "1.02rem" }}
                  className={classes.tableCellHead}
                  align="center"
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
          )}
          <TableBody>
            {bookData.length === 0 && (
              <TableRow sx={{ height: 400 }}>
                <TableCell
                  sx={{
                    fontSize: "x-large",
                  }}
                  colSpan={3}
                  align="center"
                >
                  No Data
                </TableCell>
              </TableRow>
            )}
            {books.map((book, index) => {
              return (
                book && (
                  <TableRow
                    hover
                    key={book[0]}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component={motion.td}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ delay: index * 0.1 }}
                      layout
                    >
                      {page > 0
                        ? (page - 1) * booksPerPage + index + 1
                        : index + 1}
                    </TableCell>
                    <TableCell
                      component={motion.td}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {book[1].title}
                    </TableCell>
                    <TableCell
                      component={motion.td}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {book[1].publisher}
                    </TableCell>
                    <TableCell
                      component={motion.td}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {book[1].author}
                    </TableCell>
                    <TableCell
                      component={motion.td}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {book[1].pages}
                    </TableCell>
                    <TableCell
                      component={motion.td}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {book[1].genre}
                    </TableCell>
                    <TableCell
                      align="center"
                      component={motion.td}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Button
                        color="info"
                        component={motion.div}
                        whileTap={{
                          scale: 0.7,
                          transition: { duration: 0.3 },
                        }}
                        whileHover={{
                          scale: 1.1,
                          transition: { duration: 0.2 },
                        }}
                        onClick={() => handleShowDetails(book)}
                      >
                        <InfoIcon style={{ fontSize: "1.35rem" }} />
                        &nbsp;
                        <span style={{ whiteSpace: "nowrap" }}>
                          Show details
                        </span>
                      </Button>
                    </TableCell>
                    <TableCell
                      align="center"
                      component={motion.td}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <EditBook bookData={book} />
                        <DeleteBook
                          id={book[0]}
                          openSnackbar={() => setSnackbarOpen(true)}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                )
              );
            })}
          </TableBody>
        </Table>
        <AnimatePresence>
          {Boolean(selectedBook) && (
            <ViewBook
              book={selectedBook}
              open={Boolean(selectedBook)}
              onClose={handleCloseDetails}
            />
          )}
        </AnimatePresence>
      </TableContainer>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2, mt: 3 }}>
        <Pagination
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
      </Box>
      <SnackBar
        open={snackbarOpen}
        handleClose={handleSnackbarClose}
        message={errorDELETE ? errorDELETE : "Book deleted successfully"}
        severity={errorDELETE ? "warning" : "success"}
      />
    </>
  );
}
