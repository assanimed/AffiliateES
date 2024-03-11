import { createSlice } from "@reduxjs/toolkit";

const chartSlice = createSlice({
    name: "chart",
    initialState: {
        period: "month",
    },

    reducers: {
        setPeriod: (state, action) => {
            state.period = action.payload;
        },
    },
});

export const { setPeriod } = chartSlice.actions;
export default chartSlice.reducer;
