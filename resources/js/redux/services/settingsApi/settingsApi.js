import { setError, setProgress } from "@/redux/features/upload/uploadSlice";
import affiliateApi from "../affiliateApi";

const settingsApi = affiliateApi.injectEndpoints({
    endpoints: (builder) => ({
        updateSettings: builder.mutation({
            query: (fileData) => ({
                url: "/settings",
                method: "POST",
                body: fileData,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("name")}`,
                    Accept: "application/json",
                },
            }),
            providesTags: ["settings"],
        }),

        deleteLogo: builder.mutation({
            query: () => ({
                url: "/logo",
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("name")}`,
                    Accept: "application/json",
                },
            }),
            providesTags: ["settings"],
        }),
    }),
});

export const { useUpdateSettingsMutation, useDeleteLogoMutation } = settingsApi;
