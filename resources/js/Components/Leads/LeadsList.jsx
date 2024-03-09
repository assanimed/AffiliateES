import React from "react";
import LeadHead from "./LeadHead";
import { useDispatch, useSelector } from "react-redux";
import { useGetLeadsQuery } from "@/redux/services/leadApi/leadApi";
import LeadsTable from "./LeadsTable";
import { setTotalPages } from "@/redux/features/paginate/paginateSlice";
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
            {isSuccess && <LeadsTable data={data?.data} />}

            {isError && (
                <h1 className="py-3 px-2 text-center text-xl font-bold">
                    Lailed to Load Leads
                </h1>
            )}
        </div>
    );
};

export default LeadsList;
