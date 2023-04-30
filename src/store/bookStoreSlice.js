import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getStoreBooks = createAsyncThunk(
  "books/getStoreBooks",
  async (query) => {
    const API_KEY = "AIzaSyD8A8Zf1fNPsmJAoLxd5hNtYwidx47yiVc";
    let response;
    if (query.length !== 0) {
      response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${API_KEY}&maxResults=40`
      );
      return response.data.items;
    } 
  }
);

const bookStoreSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    status: "idle",
    error: null,
  },
  reducers: {
    clearBooks(state, action) {
      state.books = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStoreBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getStoreBooks.fulfilled, (state, action) => {
        state.status = "success";
        state.books = action.payload;
      })
      .addCase(getStoreBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  actions: bookStoreActions,
  reducer: bookStoreReducer,
  selectors: bookStoreSelectors,
} = bookStoreSlice;
