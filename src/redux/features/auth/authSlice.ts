import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  token: "",
  user: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userRegistration: (state, action) => {
      state.token = action.payload.token;
    },
    userLoggedIn: (state, action) => {
      state.user = action.payload.user;
    },
    userLoggedOut: (state, action) => {
      state.token = "";
      state.user = null;
    },
  },
});

export const { userLoggedIn, userLoggedOut, userRegistration } =
  authSlice.actions;

export default authSlice;
