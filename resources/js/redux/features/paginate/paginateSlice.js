import { createSlice } from "@reduxjs/toolkit";

const paginateSlice = createSlice({
    name: "paginate",
    initialState: {
        currentPage: 1,
        limit: 5,
        totalPages: 1,
    },
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setTotalPages: (state, action) => {
            state.totalPages = action.payload;
        },
        setPageLimit: (state, action) => {
            state.limit = action.payload;
            state.currentPage = 1;
        },
    },
});

export const { setCurrentPage, setTotalPages, setPageLimit } =
    paginateSlice.actions;
export default paginateSlice.reducer;
