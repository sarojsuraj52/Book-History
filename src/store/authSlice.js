import { createSlice } from "@reduxjs/toolkit";

const initialUser = localStorage.getItem('user')

const initialState = {
    userName:initialUser,
    isLoggedIn: !!initialUser
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login(state,action){
        state.userName = action.payload
        state.isLoggedIn = true
        localStorage.setItem('user',action.payload)
    },
    logout(state,action){
        state.token = ''
        state.isLoggedIn = false
        localStorage.removeItem('user')
    }
  },
});

export const authAction = authSlice.actions;
export default authSlice.reducer;
