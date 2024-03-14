import React from "react";
import LeadHead from "./LeadHead";
import { useDispatch, useSelector } from "react-redux";
import {
    useGetLeadsQuery,
    useGetUserLeadsQuery,
} from "@/redux/services/leadApi/leadApi";
import { setTotalPages } from "@/redux/features/paginate/paginateSlice";
import { Spinner } from "@nextui-org/react";
import { usePage } from "@inertiajs/react";
import UserLeadsTable from "./UserLeadsTable";

const UserLeadsList = () => {
    const {
        props: { affiliate },
    } = usePage();

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

    const { data, isSuccess, isLoading, isError, error } = useGetUserLeadsQuery(
        {
            page: currentPage,
            limit,
            affiliate_id: affiliate?.id,
        }
    );

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

            {!data?.data?.length && isSuccess && !isLoading ? (
                <h1 className="py-3 text-slate-400 px-2 text-center text-xl font-bold">
                    No hay clientes potenciales para mostrar
                </h1>
            ) : (
                ""
            )}
            {isSuccess && data?.data?.length ? (
                <UserLeadsTable data={data?.data} />
            ) : (
                ""
            )}

            {isError && (
                <h1 className="py-3 px-2 text-center text-xl font-bold">
                    Error al cargar los clientes potenciales
                </h1>
            )}
        </div>
    );
};

export default UserLeadsList;
