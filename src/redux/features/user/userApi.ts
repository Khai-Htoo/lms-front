import build from "next/dist/build";
import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "../auth/authSlice";

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadProfile: builder.mutation({
      query: ({ avatar }) => ({
        url: "upload-profile",
        method: "POST",
        body: { avatar },
        credentials: "include" as const,
      }),
    }),
    changePassword: builder.mutation({
      query: ({ newPassword, oldPassword }) => ({
        url: "change-password",
        method: "POST",
        body: { newPassword, oldPassword },
        credentials: "include" as const,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          dispatch(
            userLoggedIn({
              user: null,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    getUsers: builder.query({
      query: () => ({
        url: "users",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    destoryAccount: builder.mutation({
      query: (id) => ({
        url: `user/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
    updateRole: builder.mutation({
      query: ({ id, role }) => ({
        url: `user/${id}`,
        method: "PUT",
        body: { role },
        credentials: "include" as const,
      }),
    }),
    usersAnalythic: builder.query({
      query: () => ({
        url: "analtytics/users",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useUploadProfileMutation,
  useLogoutMutation,
  useChangePasswordMutation,
  useGetUsersQuery,
  useDestoryAccountMutation,
  useUpdateRoleMutation,
  useUsersAnalythicQuery,
} = userApi;
