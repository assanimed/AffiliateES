import { configureStore } from "@reduxjs/toolkit";

import affiliateApi from "./services/affiliateApi";

import paginateSlice from "./features/paginate/paginateSlice";
import filterSlice from "./features/paginate/filterSlice";

export default configureStore({
    reducer: {
        [affiliateApi.reducerPath]: affiliateApi.reducer,
        paginate: paginateSlice,
        filter: filterSlice,
    },
    devTools: process.env.NODE_ENV !== "production",
    middleware: (defaultMiddleware) =>
        defaultMiddleware().concat(affiliateApi.middleware),
});
