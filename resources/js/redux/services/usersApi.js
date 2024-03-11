import affiliateApi from "./affiliateApi";

const userApi = affiliateApi.injectEndpoints({
    endpoints: (builder) => ({
        getAffiliates: builder.query({
            query: ({ status, limit, page, search, sortBy, sortType }) => ({
                url: `/affiliates?status=${status}&limit=${limit}&page=${page}&search=${search}&sortBy=${sortBy}&sortType=${sortType}`,
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("name")}`,
                    Accept: "application/json",
                },
            }),
            providesTags: ["Users"],
            keepUnusedDataFor: 60,
        }),

        UpdateUser: builder.mutation({
            query: (body) => ({
                url: `/users`,
                method: "PATCH",
                body: body,
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("name")}`,
                    Accept: "application/json",
                },
            }),
        }),
        updateAvatar: builder.mutation({
            query: (body) => ({
                url: `/avatar`,
                method: "POST",
                body: body,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("name")}`,
                    Accept: "application/json",
                },
            }),
        }),
        deleteAvatar: builder.mutation({
            query: (body) => ({
                url: `/avatar`,
                method: "DELETE",
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("name")}`,
                    Accept: "application/json",
                },
            }),
        }),
    }),
});

export const {
    useGetAffiliatesQuery,
    useUpdateUserMutation,
    useUpdateAvatarMutation,
    useDeleteAvatarMutation,
} = userApi;
