import { apiSlice } from "../api/apiSlice";

const notiApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotification: builder.query({
      query: () => ({
        url: "noti/allNoti",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useGetAllNotificationQuery } = notiApi;
