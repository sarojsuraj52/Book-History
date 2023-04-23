import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  const response = await fetch("https://okokok-7fa48-default-rtdb.firebaseio.com/books.json");
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
      if (action.payload) {
        state.booksArray.sort((a, b) => a.title.localeCompare(b.title));
      } else {
        state.booksArray.sort((a, b) => b.title.localeCompare(a.title));
      }
    },
    sortByPublicationDate(state, action) {
      if (action.payload) {
        state.booksArray = state.booksArray.sort((a, b) =>
          a.publicationDate.localeCompare(b.publicationDate)
        );
      } else {
        state.booksArray = state.booksArray.sort((a, b) =>
          b.publicationDate.localeCompare(a.publicationDate)
        );
      }
    },
    filterRead(state, action) {
      state.booksArray = state.booksArray.filter(
        (book) => book.readingStatus === "read"
      );
    },
    filterUnRead(state, action) {
      state.booksArray = state.booksArray.filter(
        (book) => book.readingStatus === "unread"
      );
    },
    filterReading(state, action) {
      state.booksArray = state.booksArray.filter(
        (book) => book.readingStatus === "reading"
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
