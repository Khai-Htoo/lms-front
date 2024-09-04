import { apiSlice } from "../api/apiSlice";

const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStripeKey: builder.query({
      query: () => ({
        url: "orders/stripeKey",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    orderPayment: builder.mutation({
      query: ({ amount }) => ({
        url: "orders/payment",
        method: "POST",
        body: { amount },
        credentials: "include" as const,
      }),
    }),
    order: builder.mutation({
      query: ({ courseId, paymentInfo }) => ({
        url: "orders",
        method: "POST",
        body: { courseId, paymentInfo },
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useGetStripeKeyQuery,
  useOrderPaymentMutation,
  useOrderMutation,
} = orderApi;
