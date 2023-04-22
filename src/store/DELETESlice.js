import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const deleteBook = createAsyncThunk("mySlice/DeleteBook", async (id) => {
    console.log(id)
  const response = await fetch(`http://localhost:3000/books/${id}`, {
    method: "DELETE",
  });
  return await response.json();
});

const DELETESlice = createSlice({
  name: "DELETESlice",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteBook.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default DELETESlice.reducer;
