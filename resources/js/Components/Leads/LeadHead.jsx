import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { AiOutlinePlus } from "react-icons/ai";

import { useDispatch, useSelector } from "react-redux";
import { setSearchKey, setStatus } from "@/redux/features/paginate/filterSlice";
import {
    setCurrentPage,
    setPageLimit,
} from "@/redux/features/paginate/paginateSlice";

import { debounce } from "lodash";
import { Link, usePage } from "@inertiajs/react";

const LeadHead = () => {
    const { searchKey } = useSelector((state) => state?.filter?.searchKey);
    const dispatch = useDispatch();

    const Statuses = ["All", "Approved", "Pending", "Banned"];

    const PageLimits = [5, 10, 20, 50, 100];

    const {
        props: { auth },
    } = usePage();

    const handleStatusChange = (e) => {
        dispatch(setStatus(e.target.value));
        dispatch(setCurrentPage(1));
    };
    const handlePageLimitChange = (e) => {
        dispatch(setPageLimit(e.target.value));
    };

    const placements = ["inside", "outside", "outside-left"];

    const handleSearchChange = (e) => {
        if (e.target.value.length >= 3) {
            dispatch(setSearchKey(e.target.value));
        }

        if (e.target.value === "") {
            dispatch(setSearchKey(""));
        }
    };

    const debounceSearch = debounce(handleSearchChange, 500);
    return (
        <div className="flex items-center gap-10 justify-between my-3 px-2  ">
            <div className="flex bg-white flex-wrap items-center gap-2 shadow-md py-1 px-3 rounded">
                <div>
                    <CiSearch className="text-2xl font-bold" />
                </div>

                <input
                    id="search"
                    name="search"
                    type="text"
                    onChange={debounceSearch}
                    placeholder="buscar por nombre de usuario o cupón"
                    className="flex-1 border-none focus:outline-none outline-none border-transparent focus:border-transparent focus:ring-0 w-60"
                />
            </div>

            {auth?.user?.role === "admin" && (
                <div className="flex justify-center items-center gap-2">
                    <Link
                        href="/leads/new"
                        className="bg-red-500 px-2 py-1.5 flex items-center gap-2 text-white rounded"
                    >
                        <span>
                            <AiOutlinePlus />
                        </span>
                        <span>Nuevo cliente potencial</span>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default LeadHead;
