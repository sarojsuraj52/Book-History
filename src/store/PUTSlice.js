import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const editBook = createAsyncThunk("mySlice/editBook", async (data) => {
  const response = await fetch(`  http://192.168.0.106:3000/books/${data.id}`, {
    method:'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    
  });
  return await response.json();
});

const PUTSlice = createSlice({
  name: "PUTSLICE",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder)=> {
    builder
    .addCase(editBook.pending, (state) => {
      state.loading = true;
    })
    .addCase(editBook.fulfilled, (state, action) => {
      state.data = action.payload.id;
      state.loading = false;
      state.error = null;
    })
    .addCase(editBook.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
  },
});

export default PUTSlice.reducer;
