import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const affiliateApi = createApi({
    reducerPath: "affiliateApi",
    tagTypes: ["affiliates"],
    keepUnusedDataFor: 5,
    baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
    endpoints: () => ({}),

    prepareHeaders: (headers, { getState }) => {
        const token = localStorage.getItem("name");

        console.log("token");

        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
            headers.set("Accept", `application/json`);
            headers.set("Content-Type", `application/json`);
        }

        return headers;
    },
    overrideExisting: false,
});

export default affiliateApi;
