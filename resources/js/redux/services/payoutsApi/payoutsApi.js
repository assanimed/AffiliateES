import { setError, setProgress } from "@/redux/features/upload/uploadSlice";
import affiliateApi from "../affiliateApi";

const payoutsApi = affiliateApi.injectEndpoints({
    endpoints: (builder) => ({
        getPayoutRequests: builder.query({
            query: ({ page, limit }) => ({
                url: `/payouts/requests?limit=${limit}&page=${page}`,
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("name")}`,
                    Accept: "application/json",
                },
            }),
            providesTags: ["payouts"],
        }),

        getPayoutsHistory: builder.query({
            query: ({ page, limit }) => ({
                url: `/payouts?limit=${limit}&page=${page}`,
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("name")}`,
                    Accept: "application/json",
                },
            }),
            providesTags: ["payouts"],
        }),

        getLead: builder.query({
            query: ({ id }) => ({
                url: `/leads/${id}`,
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("name")}`,
                    Accept: "application/json",
                },
            }),
            providesTags: ["leads"],
        }),

        getUserPayouts: builder.query({
            query: ({ user_id, page, limit }) => ({
                url: `/${user_id}/payouts?page=${page}&limit=${limit}`,
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("name")}`,
                    Accept: "application/json",
                },
            }),
            providesTags: ["payouts"],
        }),
        requestPayout: builder.mutation({
            query: ({ user_id, amount }) => ({
                url: `/${user_id}/payouts`,
                method: "POST",
                body: { amount },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("name")}`,
                    Accept: "application/json",
                },
            }),
            invalidateTags: ["payouts"],
        }),
        updatePayout: builder.mutation({
            query: (data) => ({
                url: `/payouts/${data?.id}`,
                method: "PATCH",
                body: data,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("name")}`,
                    Accept: "application/json",
                },
            }),
            invalidateTags: ["leads"],
        }),
    }),
    keepUnusedDataFor: 60 * 2,
});

export const {
    useRequestPayoutMutation,
    useGetUserPayoutsQuery,
    useGetPayoutRequestsQuery,
    useGetPayoutsHistoryQuery,
    useUpdatePayoutMutation,
} = payoutsApi;
