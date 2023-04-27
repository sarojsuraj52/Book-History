import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  const response = await fetch(
    "https://bookshistoryapp-default-rtdb.firebaseio.com/books.json"
  );
  let data = await response.json();
  data = Object.entries(data);
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
        const bookValues = Object.values(book[1]);
        return bookValues.some((value) =>
          String(value).toLowerCase().includes(action.payload.toLowerCase())
        );
      });
    },
    sortByTitle(state, action) {
      state.booksArray = state.recoverBooksArray;
      if (action.payload) {
        state.booksArray = state.booksArray.sort((a, b) =>
          a[1].title.localeCompare(b[1].title)
        );
      } else {
        state.booksArray = state.booksArray.sort((a, b) =>
          b[1].title.localeCompare(a[1].title)
        );
      }
    },
    sortByPublicationDate(state, action) {
      state.booksArray = state.recoverBooksArray;
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
      state.booksArray = state.recoverBooksArray;
      state.booksArray = state.booksArray.filter(
        (book) => book[1].readingStatus === "read"
      );
    },
    filterUnRead(state, action) {
      state.booksArray = state.recoverBooksArray;
      state.booksArray = state.booksArray.filter(
        (book) => book[1].readingStatus === "unread"
      );
    },
    filterReading(state, action) {
      state.booksArray = state.recoverBooksArray;
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

export const {
  actions: bookActions,
  reducer: bookReducer,
  selectors: bookSelectors,
} = bookSlice;

export const addBook = createAsyncThunk("mySlice/AddBook", async (data) => {
  const response = await fetch(
    "https://bookshistoryapp-default-rtdb.firebaseio.com/books.json",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
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
  extraReducers: (builder) => {
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
      });
  },
});

export const {
  actions: postActions,
  reducer: postReducer,
  selectors: postSelectors,
} = POSTSlice;


export const editBook = createAsyncThunk("mySlice/editBook", async ({data,id}) => {
  const response = await fetch(`https://bookshistoryapp-default-rtdb.firebaseio.com/books/${id}.json`, {
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


export const {
  actions: putActions,
  reducer: putReducer,
  selectors: putSelectors,
} = PUTSlice;


export const deleteBook = createAsyncThunk("mySlice/DeleteBook", async (id) => {
  const response = await fetch(
    `https://bookshistoryapp-default-rtdb.firebaseio.com/books/${id}.json`,
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


export const {
  actions: deleteActions,
  reducer: deleteReducer,
  selectors: deleteSelectors,
} = DELETESlice;
