import { apiSlice } from "../api/apiSlice";

const faqApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllFaq: builder.query({
      query: () => ({
        url: "faqs",
        method: "GET",
      }),
    }),
    storeFaq: builder.mutation({
      query: (data) => ({
        url: "faqs",
        method: "POST",
        body: data,
      }),
    }),
    updateFaq: builder.mutation({
      query: ({ id, answer, question }) => ({
        url: `faqs/${id}`,
        method: "PUT",
        body: { answer, question },
      }),
    }),
    deleteFaq: builder.mutation({
      query: (id) => ({
        url: `faqs/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllFaqQuery,
  useStoreFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
} = faqApi;
