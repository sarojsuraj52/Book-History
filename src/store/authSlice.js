import { createSlice } from "@reduxjs/toolkit";

const initialUser = localStorage.getItem('email')

const initialState = {
    userEmail:initialUser,
    isLoggedIn: !!initialUser
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login(state,action){
        state.userEmail = action.payload
        state.isLoggedIn = true
        localStorage.setItem('email',action.payload)
    },
    logout(state,action){
        state.token = ''
        state.isLoggedIn = false
        localStorage.removeItem('email')
    }
  },
});

export const authAction = authSlice.actions;
export default authSlice.reducer;
