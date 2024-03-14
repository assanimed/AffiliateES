import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Select, SelectItem, Input } from "@nextui-org/react";
import SelectorIcon from "../Utils/SelectorIcon";
import { useDispatch, useSelector } from "react-redux";
import { setSearchKey, setStatus } from "@/redux/features/paginate/filterSlice";
import {
    setCurrentPage,
    setPageLimit,
} from "@/redux/features/paginate/paginateSlice";

import { debounce } from "lodash";

const TableFilter = () => {
    const { searchKey } = useSelector((state) => state?.filter?.searchKey);
    const dispatch = useDispatch();

    const Statuses = ["All", "Approved", "Pending", "Banned"];

    const esStatus = {
        All: "Todos",
        Approved: "Aprobado",
        Pending: "Pendiente",
        Banned: "Bloqueado",
    };

    const PageLimits = [5, 10, 20, 50, 100];

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
        <div className="flex items-center gap-10 justify-between my-3 px-2 md:px-10 ">
            <div className="flex bg-white flex-wrap items-center gap-2 shadow-md py-1 px-3 rounded">
                <div>
                    <CiSearch className="text-2xl font-bold" />
                </div>

                <input
                    id="search"
                    name="search"
                    type="text"
                    onChange={debounceSearch}
                    placeholder="Buscar un usuario"
                    className="flex-1 border-none focus:outline-none outline-none border-transparent focus:border-transparent focus:ring-0 w-60"
                />
            </div>

            <div className="flex justify-center items-center gap-2">
                <Select
                    // label="Favorite Animal"
                    labelPlacement="outside"
                    placeholder="Estado"
                    className="max-w-xs py-0 w-32"
                    onChange={handleStatusChange}
                >
                    {Statuses.map((status) => (
                        <SelectItem key={status} value={`${status}`}>
                            {esStatus[status]}
                        </SelectItem>
                    ))}
                </Select>

                <Select
                    // label="Favorite Animal"
                    labelPlacement="outside"
                    placeholder="Límite de página"
                    className="max-w-xs py-0 md:w-40"
                    onChange={handlePageLimitChange}
                >
                    {PageLimits.map((limit) => (
                        <SelectItem key={limit} value={limit}>
                            {limit.toString()}
                        </SelectItem>
                    ))}
                </Select>
            </div>
        </div>
    );
};

export default TableFilter;
