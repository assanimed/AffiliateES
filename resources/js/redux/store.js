import { configureStore } from "@reduxjs/toolkit";

import affiliateApi from "./services/affiliateApi";
import countriesApi from "./services/countriesApi";

import paginateSlice from "./features/paginate/paginateSlice";
import filterSlice from "./features/paginate/filterSlice";
import uploadSlice from "./features/upload/uploadSlice";
import offerSlice from "./features/offer/offerSlice";
import drawerSlice from "./features/drawer/drawerSlice";
import chartSlice from "./features/chart/chartSlice";

export default configureStore({
    reducer: {
        [affiliateApi.reducerPath]: affiliateApi.reducer,
        [countriesApi.reducerPath]: countriesApi.reducer,
        paginate: paginateSlice,
        filter: filterSlice,
        upload: uploadSlice,
        offer: offerSlice,
        drawer: drawerSlice,
        chart: chartSlice,
    },
    devTools: process.env.NODE_ENV !== "production",
    middleware: (defaultMiddleware) =>
        defaultMiddleware()
            .concat(affiliateApi.middleware)
            .concat(countriesApi.middleware),
});
