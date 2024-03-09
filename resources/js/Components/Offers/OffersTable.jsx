import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Pagination, Spinner } from "@nextui-org/react";
import { useGetOffersQuery } from "@/redux/services/offersApi/offersApi";
import OfferTableList from "./OfferTableList";
import {
    setCurrentPage,
    setTotalPages,
} from "@/redux/features/paginate/paginateSlice";
import { Box, LoadingOverlay } from "@mantine/core";
import { setSearchKey } from "@/redux/features/paginate/filterSlice";

export default function OffersTable() {
    const dispatch = useDispatch();

    const {
        sortType,
        sortBy,
        searchKey,
        status,
        currentPage,
        limit,
        totalPages,
    } = useSelector((state) => ({
        ...state?.filter,
        ...state?.paginate,
    }));

    const { data, isSuccess, isLoading, isError } = useGetOffersQuery({
        status,
        limit,
        page: currentPage,
        search: searchKey,
        sortBy: sortBy,
        sortType,
    });

    if (isSuccess) {
        dispatch(setTotalPages(data?.last_page));
    }

    const handlePageChange = (page) => {
        dispatch(setCurrentPage(page));
    };

    useEffect(() => {
        return () => {
            dispatch(setCurrentPage(1));
            dispatch(setSearchKey(""));
        };
    }, []);

    return (
        <div className="relative px-3 py-6">
            {isLoading && (
                <div className="flex flex-col justify-center items-center gap-3 my-2">
                    <span className="font-bold text-gray-500">
                        Data is Loading...
                    </span>
                    <Spinner size="lg" />{" "}
                </div>
            )}
            {isSuccess && data?.data && <OfferTableList data={data?.data} />}
            {totalPages > 1 && (
                <div className="flex justify-end px-14 py-2">
                    <Pagination
                        showControls
                        total={totalPages}
                        initialPage={currentPage}
                        onChange={handlePageChange}
                    />
                </div>
            )}
            {isError && (
                <h1 className="py-3 px-2 text-center text-xl font-bold">
                    Lailed to Load Offers
                </h1>
            )}
        </div>
    );
}
