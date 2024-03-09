import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const countriesApi = createApi({
    reducerPath: "countries",
    tagTypes: ["countries"],
    keepUnusedDataFor: 5,
    baseQuery: fetchBaseQuery({ baseUrl: "https://restcountries.com/v3.1" }),
    endpoints: (builder) => ({
        getAllCountries: builder.query({
            query: () => `/all?fields=name`,
        }),
    }),

    overrideExisting: false,
});

export const { useGetAllCountriesQuery } = countriesApi;

export default countriesApi;
