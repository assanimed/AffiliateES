import { setError, setProgress } from "@/redux/features/upload/uploadSlice";
import affiliateApi from "../affiliateApi";

const offerApi = affiliateApi.injectEndpoints({
    endpoints: (builder) => ({
        getOffers: builder.query({
            query: ({ page, search }) => ({
                url: `/offers?status=&page=${page}&search=${search}`,
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("name")}`,
                    Accept: "application/json",
                },
            }),
            providesTags: ["Users"],
        }),
    }),
});

export const { useGetOffersQuery } = offerApi;
