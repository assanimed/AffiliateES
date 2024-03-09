import React from "react";

import { useGetAffiliatesQuery } from "@/redux/services/usersApi";
import { useDispatch, useSelector } from "react-redux";
import TablePreview from "./TablePreview";
import { setTotalPages } from "@/redux/features/paginate/paginateSlice";
import { Spinner } from "@nextui-org/react";

export default function UsersTable() {
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

    const { data, isSuccess, isLoading, isError } = useGetAffiliatesQuery({
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

    return (
        <>
            {isLoading && (
                <div className="flex flex-col justify-center items-center gap-3 my-2">
                    <span className="font-bold text-gray-500">
                        Data is Loading...
                    </span>
                    <Spinner size="lg" />{" "}
                </div>
            )}
            {isSuccess && data?.data && <TablePreview users={data?.data} />}
            {isError && (
                <h1 className="py-3 px-2 text-center text-xl font-bold">
                    Lailed to Load Users
                </h1>
            )}
        </>
    );
}
