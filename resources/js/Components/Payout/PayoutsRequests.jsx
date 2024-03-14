import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { setTotalPages } from "@/redux/features/paginate/paginateSlice";
import { Spinner } from "@nextui-org/react";
import { usePage } from "@inertiajs/react";
import { useGetPayoutRequestsQuery } from "@/redux/services/payoutsApi/payoutsApi";
import PayoutsUserTable from "./PayoutsUserTable";
import HistoryPayoutsTable from "./HistoryPayoutsTable";
import PayoutsRequestTable from "./PayoutsRequestTable";

const PayoutsRequests = () => {
    const {
        props: { auth },
    } = usePage();

    // return <h1>CHEKC</h1>;
    const dispatch = useDispatch();
    const { currentPage, limit } = useSelector((state) => state?.paginate);

    const { data, isSuccess, isLoading, isError, error } =
        useGetPayoutRequestsQuery({
            page: currentPage,
            limit,
        });

    if (isSuccess) {
        dispatch(setTotalPages(data?.last_page));
    }

    return (
        <div>
            {isLoading && (
                <div className="flex flex-col justify-center items-center gap-3 my-5">
                    <span className="font-bold text-gray-500">
                        Los datos se están cargando...
                    </span>
                    <Spinner size="lg" />{" "}
                </div>
            )}

            {!data?.data?.length && isSuccess ? (
                <h1 className="py-3 text-slate-400 px-2 text-center text-xl font-bold">
                    No se encontraron solicitudes
                </h1>
            ) : (
                ""
            )}

            {isSuccess && data?.data?.length ? (
                <PayoutsRequestTable data={data?.data} />
            ) : (
                ""
            )}

            {isError && (
                <h1 className="py-3 px-2 text-center text-xl font-bold">
                    Error al cargar las solicitudes
                </h1>
            )}
        </div>
    );
};

export default PayoutsRequests;
