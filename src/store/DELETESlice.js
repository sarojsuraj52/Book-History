import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const deleteBook = createAsyncThunk("mySlice/DeleteBook", async (id) => {
  const response = await fetch(
    `https://okokok-7fa48-default-rtdb.firebaseio.com/books/${id}.json`,
    {
      method: "DELETE",
    }
  );

  const data = await response.json();
  return data;
});

const DELETESlice = createSlice({
  name: "DELETESlice",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    updateId(state, action) {
      state.data = action.payload;
    },
  },
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

export const DELETEAction = DELETESlice.actions
export default DELETESlice.reducer;
