"use client";
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/apiSlice";
import authSlice from "./features/auth/authSlice";
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// call the getAuthUser request ervey page reload
const initailizeApp = async () => {
  await store.dispatch(
    apiSlice.endpoints.getAuthUser.initiate({}, { forceRefetch: true })
  );
};
initailizeApp();
