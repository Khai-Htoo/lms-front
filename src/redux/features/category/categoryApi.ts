import { query } from "express";
import { apiSlice } from "../api/apiSlice";

const categoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({
        url: "categories",
        method: "GET",
      }),
    }),
    updateCategory: builder.mutation({
      query: ({ id, title }) => ({
        url: `categories/${id}`,
        method: "PUT",
        body: { title },
      }),
    }),
    storeCategory: builder.mutation({
      query: (data) => ({
        url: `categories`,
        method: "POST",
        body: data,
      }),
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `categories/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
  useStoreCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
