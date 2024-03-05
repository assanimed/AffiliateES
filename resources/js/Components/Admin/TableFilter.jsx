import React from "react";
import { CiSearch } from "react-icons/ci";
import { Select, SelectItem, Input } from "@nextui-org/react";
import SelectorIcon from "../Utils/SelectorIcon";

const TableFilter = () => {
    const Statuses = ["Approved", "Pending", "Banned"];
    const PageLimits = [5, 10, 20, "All"];

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
                    placeholder="search for a user"
                    className="flex-1 border-none focus:outline-none outline-none border-transparent focus:border-transparent focus:ring-0 w-60"
                />
            </div>

            <div className="flex justify-center items-center gap-2">
                <Select
                    placeholder="Filter By Status"
                    labelPlacement="outside"
                    className="max-w-xs w-40"
                    disableSelectorIconRotation
                    selectorIcon={<SelectorIcon />}
                >
                    {Statuses.map((status) => (
                        <SelectItem key={status} value={status}>
                            {status}
                        </SelectItem>
                    ))}
                </Select>

                <Select
                    placeholder="Page Limit"
                    labelPlacement="outside"
                    className="max-w-xs w-32"
                    disableSelectorIconRotation
                    selectorIcon={<SelectorIcon />}
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
