import { setError, setProgress } from "@/redux/features/upload/uploadSlice";
import affiliateApi from "../affiliateApi";

const leadApi = affiliateApi.injectEndpoints({
    endpoints: (builder) => ({
        getLeads: builder.query({
            query: ({ page, search, limit }) => ({
                url: `/leads?limit=${limit}&page=${page}&search=${search}`,
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("name")}`,
                    Accept: "application/json",
                },
            }),
            providesTags: ["leads"],
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
        createLead: builder.mutation({
            query: (data) => ({
                url: "/leads",
                method: "POST",
                body: data,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("name")}`,
                    Accept: "application/json",
                },
            }),
            invalidateTags: ["leads"],
        }),
        updateLead: builder.mutation({
            query: (data) => ({
                url: `/leads/${data?.id}`,
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
});

export const {
    useGetLeadsQuery,
    useCreateLeadMutation,
    useUpdateLeadMutation,
} = leadApi;
