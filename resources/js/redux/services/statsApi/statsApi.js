import affiliateApi from "../affiliateApi";

const statsApi = affiliateApi.injectEndpoints({
    endpoints: (builder) => ({
        getPeriod: builder.query({
            query: ({ period }) => ({
                url: `/leads/stats?period=${period}`,
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("name")}`,
                    Accept: "application/json",
                },
            }),
            providesTags: ["stats"],
            keepUnusedDataFor: 15,
        }),
    }),
});

export const { useGetPeriodQuery } = statsApi;
