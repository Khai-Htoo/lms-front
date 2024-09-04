import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn } from "../auth/authSlice";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api",
    credentials: "include" as const,
  }),
  endpoints: (builder) => ({
    getAuthUser: builder.query({
      query: () => ({
        url: "me",
        method: "GET",
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(userLoggedIn({ user: result.data.result }));
        } catch (error) {
          console.error("Failed to fetch auth user:", error);
        }
      },
    }),
  }),
});

export const { useGetAuthUserQuery } = apiSlice;
