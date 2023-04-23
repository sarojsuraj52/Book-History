import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const editBook = createAsyncThunk("mySlice/editBook", async ({data,id}) => {
  const response = await fetch(`https://okokok-7fa48-default-rtdb.firebaseio.com/books/${id}.json`, {
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
      state.data = action.payload;
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
