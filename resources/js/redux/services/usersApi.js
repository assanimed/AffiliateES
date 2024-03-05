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
        }),

        /* sendPasswordResetLink: builder.mutation({
            query: (body) => ({
                url: "",
                method: "POST",
                body,
            }),
        }), */
    }),
});

export const { useGetAffiliatesQuery } = userApi;
