import { apiSlice } from "../api/apiSlice";

const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (data) => ({
        url: "courses",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getAllCourse: builder.query({
      query: () => ({
        url: "courses",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getPaidCourse: builder.query({
      query: (id) => ({
        url: `courses/content/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    updateCourse: builder.mutation({
      query: ({ id, data }) => ({
        url: `courses/${id}`,
        method: "PUT",
        body: { ...data },
        credentials: "include" as const,
      }),
    }),
    destroyCourse: builder.mutation({
      query: (id) => ({
        url: `courses/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
    addReview: builder.mutation({
      query: ({ id, review, rating }) => ({
        url: `courses/addReview/${id}`,
        method: "PUT",
        body: { review, rating },
        credentials: "include" as const,
      }),
    }),
    addQuestion: builder.mutation({
      query: ({ id, dataId, contentId, question }) => ({
        url: `courses/addQuestion/${id}`,
        method: "PUT",
        body: { dataId, contentId, question },
        credentials: "include" as const,
      }),
    }),
    replyQuestion: builder.mutation({
      query: ({ id, dataId, contentId, questionId, reply }) => ({
        url: `courses/replyQuestion/${id}`,
        method: "PUT",
        body: { dataId, contentId, questionId, reply },
        credentials: "include" as const,
      }),
    }),
    coursesAnalythic: builder.query({
      query: () => ({
        url: "analtytics/courses",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
});
export const {
  useCreateCourseMutation,
  useGetAllCourseQuery,
  useDestroyCourseMutation,
  useUpdateCourseMutation,
  useGetPaidCourseQuery,
  useAddReviewMutation,
  useAddQuestionMutation,
  useReplyQuestionMutation,
  useCoursesAnalythicQuery,
} = courseApi;
