import React, { useState } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
  Box,
  FormHelperText,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import CommonModal from "../common/CommonModal";
import { useDispatch, useSelector } from "react-redux";
// import { addBook } from "../store/POSTSlice";
import { addBook } from "../../store/bookSlice";
import { editBook } from "../../store/bookSlice";
import { useLocation, useNavigate } from "react-router-dom";

const bookGenres = [
  "Fiction",
  "Non-fiction",
  "Mystery",
  "Thriller",
  "Romance",
  "Fantasy",
  "Science fiction",
  "Horror",
  "Historical fiction",
  "Biography",
  "Autobiography",
  "Memoir",
  "Cookbooks",
  "Travel",
  "Self-help",
  "Business",
  "Young adult",
  "Children",
  "Poetry",
  "Drama",
  "Comedy",
];

const BookForm = ({ open, onClose, method, bookData, openSnackbar }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  // console.log(location)

  const validationSchema = yup.object({
    title: yup.string().required("Title is required").min(4),
    author: yup.string().required("Author is required").min(4),
    publisher: yup.string().required("Publisher is required").min(4),
    genre: yup
      .string()
      .required("Please select a genre")
      .oneOf(
        [
          "Fiction",
          "Non-fiction",
          "Mystery",
          "Thriller",
          "Romance",
          "Fantasy",
          "Science fiction",
          "Horror",
          "Historical fiction",
          "Biography",
          "Autobiography",
          "Memoir",
          "Cookbooks",
          "Travel",
          "Self-help",
          "Business",
          "Young adult",
          "Children",
          "Poetry",
          "Drama",
          "Comedy",
        ],
        "Invalid genre"
      ),
    publicationDate: yup.date().required("Publication Date is required"),
    pages: yup.number().required().min(1, "Atleast 1 page is required"),
    currentPage: yup.number(),
    readingStatus: yup
      .string()
      .required("Reading status is required")
      .oneOf(["unread", "reading", "read"], "Invalid reading status"),
    source: yup
      .string()
      .required("Please select a source")
      .oneOf(["Purchased", "Borrowed", "Rented"], "Invalid source"),
    startDate: yup.date(),
    endDate: yup.date(),
  });

  const onSubmit = (values) => {
    if (method == "POST") {
      dispatch(addBook(values));
      openSnackbar();
      onClose();
      if (location.pathname == "/") {
        navigate("/bookList");
      }
    }
    if (method == "PUT") {
      dispatch(editBook({ data: values, id: bookData[0] }));
      openSnackbar();
      onClose();
    }
  };

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: bookData?.[1] || {
        title: "",
        author: "",
        publisher: "",
        genre: "",
        publicationDate: "",
        pages: "",
        readingStatus: "",
        currentPage: "",
        startDate: "",
        endDate: "",
        source: "",
      },
      validationSchema: validationSchema,
      onSubmit: onSubmit,
    });

  return (
    <>
      <CommonModal onClose={onClose} open={open}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            p: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            style={{ marginBottom: "30px" }}
            component="h2"
            variant="h5"
          >
            {method == "POST" ? "Add Book" : "Edit Book"}
          </Typography>
          <TextField
            name="title"
            sx={{ mb: 2.5 }}
            fullWidth
            label="Title"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={errors.title && touched.title ? errors.title : ""}
            color={errors.title ? "warning" : ""}
            error={errors.title ? true : false}
          />
          <TextField
            name="author"
            sx={{ mb: 2.5 }}
            fullWidth
            label="Author"
            value={values.author}
            onChange={handleChange}
            helperText={errors.author && touched.author ? errors.author : ""}
            onBlur={handleBlur}
            color={errors.author ? "warning" : ""}
            error={errors.author ? true : false}
          />
          <TextField
            name="publisher"
            sx={{ mb: 2.5 }}
            fullWidth
            label="Publisher"
            value={values.publisher}
            onChange={handleChange}
            helperText={
              errors.publisher && touched.publisher ? errors.publisher : ""
            }
            onBlur={handleBlur}
            color={errors.publisher ? "warning" : ""}
            error={errors.publisher ? true : false}
          />
          <FormControl fullWidth sx={{ mb: 2.5 }}>
            <InputLabel id="genre-select-label">Genre</InputLabel>
            <Select
              labelId="genre-select-label"
              id="genre-select"
              label="Genre"
              name="genre"
              value={values.genre}
              onChange={handleChange}
              onBlur={handleBlur}
              color={errors.genre ? "warning" : ""}
              sx={{ width: "100%" }}
            >
              {bookGenres.map((genre) => (
                <MenuItem key={genre} value={genre}>
                  {genre}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText error={errors.genre ? true : false}>
              {errors.genre && touched.genre ? errors.genre : ""}
            </FormHelperText>
          </FormControl>
          <TextField
            name="publicationDate"
            sx={{ mb: 2.5 }}
            fullWidth
            label="Publication Date"
            type="date"
            value={values.publicationDate}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            helperText={
              errors.publicationDate && touched.publicationDate
                ? errors.publicationDate
                : ""
            }
            color={errors.publicationDate ? "warning" : ""}
            onBlur={handleBlur}
            error={errors.publicationDate ? true : false}
          />
          <TextField
            name="pages"
            sx={{ mb: 2.5 }}
            fullWidth
            label="Pages"
            type="number"
            value={values.pages}
            onChange={handleChange}
            helperText={errors.pages && touched.pages ? errors.pages : ""}
            color={errors.pages ? "warning" : ""}
            onBlur={handleBlur}
            error={errors.pages ? true : false}
          />

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Reading Status
            </InputLabel>
            <Select
              name="readingStatus"
              sx={{ mb: 2.5, width: "100%" }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Reading Status"
              value={values.readingStatus}
              onChange={handleChange}
              color={errors.readingStatus ? "warning" : ""}
              onBlur={handleBlur}
              error={errors.readingStatus ? true : false}
            >
              <MenuItem value="unread">Unread</MenuItem>
              <MenuItem value="reading">Currently Reading</MenuItem>
              <MenuItem value="read">Read</MenuItem>
            </Select>
            <FormHelperText error={errors.readingStatus ? true : false}>
              {errors.readingStatus && touched.readingStatus
                ? errors.readingStatus
                : ""}
            </FormHelperText>
          </FormControl>

          <Box
            display={
              values.readingStatus === "reading" ||
              values.readingStatus === "read"
                ? "block"
                : "none"
            }
            width={"100%"}
          >
            <TextField
              name="currentPage"
              sx={{
                display: values.readingStatus === "reading" ? "block" : "none",
                mb: 2.5,
              }}
              fullWidth
              label="Current Page"
              type="number"
              value={values.currentPage}
              onChange={handleChange}
            />
            <TextField
              name="startDate"
              sx={{ mb: 2.5 }}
              fullWidth
              label="Start Date"
              type="date"
              value={values.startDate}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              name="endDate"
              sx={{ mb: 2.5 }}
              fullWidth
              label="End Date"
              type="date"
              value={values.endDate}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
          <Box sx={{ width: "100%", mb: 2.5 }}>
            <FormControl>
              <RadioGroup
                value={values.source}
                onChange={handleChange}
                name="source"
                sx={{ display: "flex", flexDirection: "row" }}
              >
                <FormControlLabel
                  sx={{ pr: 2 }}
                  value="Purchased"
                  control={<Radio />}
                  label="Purchased"
                />
                <FormControlLabel
                  value="Borrowed"
                  control={<Radio />}
                  label="Borrowed"
                />
                <FormControlLabel
                  value="Rented"
                  control={<Radio />}
                  label="Rented"
                />
              </RadioGroup>
              <FormHelperText error={errors.source ? true : false}>
                {errors.source ? errors.source : ""}
              </FormHelperText>
            </FormControl>
          </Box>
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
          >
            <Button
              variant="contained"
              size="large"
              color="error"
              onClick={onClose}
              sx={{ mr: 2 }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              size="large"
              color="primary"
              type="submit"
            >
              {method == "POST" ? "Add Book" : "Edit Book"}
            </Button>
          </Box>
        </Box>
      </CommonModal>
    </>
  );
};

export default BookForm;
