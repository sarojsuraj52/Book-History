import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import bookSlice from "./bookSlice";
import POSTSlice from "./POSTSlice";
import PUTSlice from "./PUTSlice";
import DELETESlice from "./DELETESlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    books: bookSlice,
    post: POSTSlice,
    put: PUTSlice,
    delete: DELETESlice,
  },
});
export default store;
