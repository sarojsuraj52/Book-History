import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import { bookReducer } from "./bookSlice";
import { postReducer } from "./bookSlice";
import { putReducer } from "./bookSlice";
import { deleteReducer } from "./bookSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  books: bookReducer,
  post: postReducer,
  put: putReducer,
  delete: deleteReducer,
});

export default rootReducer;
