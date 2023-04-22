import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addBook = createAsyncThunk("mySlice/AddBook", async (data) => {
  const response = await fetch("http://192.168.0.106:3000/books", {
    method:'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    
  });
  return await response.json();
});

const POSTSlice = createSlice({
  name: "POSTSLICE",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder)=> {
    builder
    .addCase(addBook.pending, (state) => {
      state.loading = true;
    })
    .addCase(addBook.fulfilled, (state, action) => {
      state.data = action.payload.id;
      state.loading = false;
      state.error = null;
    })
    .addCase(addBook.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
  },
});

export default POSTSlice.reducer;
