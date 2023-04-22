import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
    const response = await fetch('http://192.168.0.106:3000/books');
    const data = await response.json();
    return data;
  });

const bookSlice = createSlice({
  name: "books Data",
  initialState: {
    booksArray: [],
    status: "idle",
    error: null,
  },
  reducers:{},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = 'success';
        state.booksArray = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
    },
});

export const bookAction = bookSlice.actions
export default bookSlice.reducer;