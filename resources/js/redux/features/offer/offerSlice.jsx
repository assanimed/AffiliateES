import { createSlice } from "@reduxjs/toolkit";

const offerSlice = createSlice({
    name: "offerSlice",
    initialState: {
        title: "",
        description: "",
        assets: [],
        tobeDeleted: null,
    },

    reducers: {
        setToBeDeleted: (state, action) => {
            state.tobeDeleted = action.payload;
        },
        setTitle: (state, action) => {
            state.title = action.payload;
        },
        setDescription: (state, action) => {
            state.description = action.payload;
        },
        addAsset: (state, action) => {
            // console.log("payload", action.payload);

            state.assets = [...state.assets, action.payload];
        },
        removeAsset: (state, action) => {
            state.assets = state.assets.filter(
                (as) => as.id !== action.payload
            );
        },
    },
});

export const {
    setTitle,
    setDescription,
    addAsset,
    removeAsset,
    setToBeDeleted,
} = offerSlice.actions;
export default offerSlice.reducer;
