import { setError, setProgress } from "@/redux/features/upload/uploadSlice";
import affiliateApi from "../affiliateApi";

const assetsApi = affiliateApi.injectEndpoints({
    endpoints: (builder) => ({
        uploadAsset: builder.mutation({
            query: (fileData) => ({
                url: "/assets",
                method: "POST",
                body: fileData,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("name")}`,
                    Accept: "application/json",
                },
            }),
            providesTags: ["assets"],
        }),
        deleteAsset: builder.mutation({
            query: ({ id }) => ({
                url: `/assets/${id}`,
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("name")}`,
                    Accept: "application/json",
                },
            }),
            invalidatesTags: ["assets"],
        }),
    }),
});

export const { useUploadAssetMutation, useDeleteAssetMutation } = assetsApi;
