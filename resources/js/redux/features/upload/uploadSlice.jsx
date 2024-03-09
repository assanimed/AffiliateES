import { createSlice } from "@reduxjs/toolkit";

const uploadSlice = createSlice({
    name: "userSlice",
    initialState: {
        uploading: false,
        processing: false,
        progress: 0,
        error: false,
        file: null,
        data: null,
    },

    reducers: {
        setData: (state, action) => {
            state.data = action.payload;
        },
        setFile: (state, action) => {
            state.file = action.payload;
        },
        setUploading: (state, action) => {
            state.uploading = action.payload;
        },
        setProgress: (state, action) => {
            state.progress = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setProcessing: (state, action) => {
            state.processing = action.payload;
        },
    },
});

export const {
    setUploading,
    setProgress,
    setError,
    setProcessing,
    setData,
    setFile,
} = uploadSlice.actions;
export default uploadSlice.reducer;
