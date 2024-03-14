import React, { useEffect } from "react";

import { useGetAffiliatesQuery } from "@/redux/services/usersApi";
import { useDispatch, useSelector } from "react-redux";
import TablePreview from "./TablePreview";
import {
    setTotalPages,
    setPageLimit,
    setCurrentPage,
} from "@/redux/features/paginate/paginateSlice";
import {
    setSearchKey,
    setSortBy,
    setSortType,
} from "@/redux/features/paginate/filterSlice";

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

    useEffect(() => {
        return () => {
            dispatch(setCurrentPage(1));
            dispatch(setSearchKey(""));
            dispatch(setSortType(""));
            dispatch(setPageLimit(5));
        };
    }, []);

    return (
        <>
            {isLoading && (
                <div className="flex flex-col justify-center items-center gap-3 my-2">
                    <span className="font-bold text-gray-500">
                        Los datos se están cargando...
                    </span>
                    <Spinner size="lg" />{" "}
                </div>
            )}
            {isSuccess && data?.data?.length ? (
                <TablePreview users={data?.data} />
            ) : (
                <h1 className="py-3 text-slate-400 px-2 text-center text-xl font-bold">
                    Aún no hay usuarios
                </h1>
            )}
            {isError && (
                <h1 className="py-3 px-2 text-center text-xl font-bold">
                    Error al cargar usuarios
                </h1>
            )}
        </>
    );
}
