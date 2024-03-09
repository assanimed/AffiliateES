import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name: "filter",
    initialState: {
        sortType: "",
        sortBy: "",
        searchKey: "",
        status: "",
    },
    reducers: {
        setSortType: (state, action) => {
            state.sortType = action.payload;
        },
        setSortBy: (state, action) => {
            state.sortBy = action.payload;
        },
        setSearchKey: (state, action) => {
            state.searchKey = action.payload;
        },
        setStatus: (state, action) => {
            state.status = action.payload;
        },
    },
});

export const { setSortType, setSortBy, setSearchKey, setStatus } =
    filterSlice.actions;
export default filterSlice.reducer;
