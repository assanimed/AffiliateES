import React, { useEffect } from "react";
import LeadHead from "./LeadHead";
import { useDispatch, useSelector } from "react-redux";
import { useGetLeadsQuery } from "@/redux/services/leadApi/leadApi";
import LeadsTable from "./LeadsTable";
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

const LeadsList = () => {
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

    const { data, isSuccess, isLoading, isError, error } = useGetLeadsQuery({
        page: currentPage,
        search: searchKey,
        limit,
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
        <div>
            <LeadHead />
            {isLoading && (
                <div className="flex flex-col justify-center items-center gap-3 my-5">
                    <span className="font-bold text-gray-500">
                        Data is Loading...
                    </span>
                    <Spinner size="lg" />{" "}
                </div>
            )}
            {isSuccess && data?.data?.length ? (
                <LeadsTable data={data?.data} />
            ) : (
                <h1 className="py-3 text-slate-400 px-2 text-center text-xl font-bold">
                    No Leads Yet
                </h1>
            )}

            {isError && (
                <h1 className="py-3 px-2 text-center text-xl font-bold">
                    Lailed to Load Leads
                </h1>
            )}
        </div>
    );
};

export default LeadsList;
