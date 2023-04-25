import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  const response = await fetch("https://bookshistoryapp-default-rtdb.firebaseio.com//books.json");
  let data = await response.json();
  data = Object.entries(data)
  return data;
});

const bookSlice = createSlice({
  name: "books Data",
  initialState: {
    booksArray: [],
    recoverBooksArray: [],
    status: "idle",
    error: null,
  },
  reducers: {
    search(state, action) {
      state.booksArray = state.booksArray.filter((book) => {
        const bookValues = Object.values(book);
        return bookValues.some((value) =>
          String(value).toLowerCase().includes(action.payload.toLowerCase())
        );
      });
    },
    sortByTitle(state, action) {
      state.booksArray = state.recoverBooksArray
      if (action.payload) {
        state.booksArray = state.booksArray.sort((a,b)=>a[1].title.localeCompare(b[1].title));
      } else {
        state.booksArray = state.booksArray.sort((a, b) => b[1].title.localeCompare(a[1].title));
      }
    },
    sortByPublicationDate(state, action) {
      state.booksArray = state.recoverBooksArray
      if (action.payload) {
        state.booksArray = state.booksArray.sort((a, b) =>
          a[1].publicationDate.localeCompare(b[1].publicationDate)
        );
      } else {
        state.booksArray = state.booksArray.sort((a, b) =>
          b[1].publicationDate.localeCompare(a[1].publicationDate)
        );
      }
    },
    filterRead(state, action) {
      state.booksArray = state.recoverBooksArray
      state.booksArray = state.booksArray.filter(
        (book) => book[[1]].readingStatus === "read"
        );
      },
      filterUnRead(state, action) {
      state.booksArray = state.recoverBooksArray
      state.booksArray = state.booksArray.filter(
        (book) => book[1].readingStatus === "unread"
        );
      },
      filterReading(state, action) {
      state.booksArray = state.recoverBooksArray
      state.booksArray = state.booksArray.filter(
        (book) => book[1].readingStatus === "reading"
      );
    },
    clearFilter(state, action) {
      state.booksArray = [...state.recoverBooksArray];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = "success";
        state.booksArray = action.payload;
        state.recoverBooksArray = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const bookAction = bookSlice.actions;
export default bookSlice.reducer;
