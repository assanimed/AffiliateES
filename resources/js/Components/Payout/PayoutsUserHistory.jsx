import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { setTotalPages } from "@/redux/features/paginate/paginateSlice";
import { Spinner } from "@nextui-org/react";
import { usePage } from "@inertiajs/react";
import { useGetUserPayoutsQuery } from "@/redux/services/payoutsApi/payoutsApi";
import PayoutsUserTable from "./PayoutsUserTable";

const PayoutsUserHistory = ({ user }) => {
    const {
        props: { auth },
    } = usePage();

    // return <h1>CHEKC</h1>;
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

    const { data, isSuccess, isLoading, isError, error } =
        useGetUserPayoutsQuery({
            page: currentPage,
            limit,
            user_id: auth?.user?.id,
        });

    if (isSuccess) {
        console.log("GET ", data?.data);
        dispatch(setTotalPages(data?.last_page));
    }

    return (
        <div>
            {isLoading && (
                <div className="flex flex-col justify-center items-center gap-3 my-5">
                    <span className="font-bold text-gray-500">
                        Data is Loading...
                    </span>
                    <Spinner size="lg" />{" "}
                </div>
            )}

            {!data?.data?.length && isSuccess && (
                <h1 className="py-3 text-slate-400 px-2 text-center text-xl font-bold">
                    No Leads To show
                </h1>
            )}

            {isSuccess && data?.data?.length && (
                <PayoutsUserTable data={data?.data} />
            )}

            {isError && (
                <h1 className="py-3 px-2 text-center text-xl font-bold">
                    Lailed to Load Leads
                </h1>
            )}
        </div>
    );
};

export default PayoutsUserHistory;
