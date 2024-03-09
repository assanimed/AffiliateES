import React, { useEffect } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    User,
    Chip,
    Tooltip,
    getKeyValue,
    Pagination,
    PaginationItem,
    PaginationCursor,
    Select,
    SelectItem,
} from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import {
    setCurrentPage,
    setPageLimit,
} from "@/redux/features/paginate/paginateSlice";
import { BsThreeDotsVertical } from "react-icons/bs";
import { setSortBy, setSortType } from "@/redux/features/paginate/filterSlice";
import EditPopOver from "../Admin/EditPopOver";

const columns = [
    { name: "ID", uid: "id" },
    { name: "STATUS", uid: "status" },
    { name: "Created At", uid: "created_at" },
];

const statusColorMap = {
    shipped: "primary",
    pending: "success",
};

const UserLeadsTable = ({ data }) => {
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

    const mappedLeads = data.map((lead) => ({
        id: lead?.id,
        status: lead?.status,
        created_at: new Date(lead?.created_at).toLocaleDateString() ?? "-",
    }));

    /*     const SortTable = (by) => {
        dispatch(setSortBy(by));
        if (!sortType || sortType === "" || by !== sortBy) {
            dispatch(setSortType("asc"));
        } else {
            dispatch(setSortType(sortType === "asc" ? "desc" : "asc"));
        }
    }; */

    const PageLimits = [5, 10, 20, 50, 100];
    const handlePageLimitChange = (e) => {
        dispatch(setPageLimit(e.target.value));
    };

    const renderCell = React.useCallback((lead, columnKey) => {
        const cellValue = lead[columnKey];

        switch (columnKey) {
            case "ID":
                return (
                    <User description={lead.id} name={cellValue}>
                        {lead.id}
                    </User>
                );
            case "created_at":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">
                            {cellValue}
                        </p>
                    </div>
                );
            case "status":
                return (
                    <Chip
                        className="capitalize"
                        color={statusColorMap[lead?.status]}
                        size="sm"
                        variant="flat"
                    >
                        {cellValue}
                    </Chip>
                );
            default:
                return cellValue;
        }
    }, []);

    useEffect(() => {
        return () => {
            return () => {
                dispatch(setCurrentPage(1));
                dispatch(setSearchKey(""));
                dispatch(setSortType(""));
                dispatch(setPageLimit(5));
            };
        };
    }, []);

    return (
        <div>
            <div className="">
                <div className="flex justify-between items-center px-5 my-2">
                    <h1 className=" text-slate-500">Leads History</h1>
                    <Select
                        items={PageLimits}
                        labelPlacement="outside"
                        placeholder="Page Limit"
                        className="max-w-xs py-0 md:w-32"
                        onChange={handlePageLimitChange}
                        size="sm"
                    >
                        {PageLimits.map((_, index) => (
                            <SelectItem
                                key={PageLimits[index]}
                                value={PageLimits[index]}
                            >
                                {PageLimits[index]}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
                <Table
                    aria-label="Example table with custom cells"
                    shadow="none"
                    className="max-w-[800px] mx-auto"
                >
                    <TableHeader columns={columns}>
                        {(column) => (
                            <TableColumn
                                key={column.uid}
                                align={
                                    column.uid === "actions"
                                        ? "center"
                                        : "start"
                                }
                            >
                                <div>
                                    <span>{column.name}</span>
                                </div>
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody items={mappedLeads}>
                        {(item) => (
                            <TableRow key={item.id}>
                                {(columnKey) => (
                                    <TableCell>
                                        {renderCell(item, columnKey)}
                                    </TableCell>
                                )}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                {totalPages > 1 && (
                    <div className="flex justify-end px-14 py-2">
                        <Pagination
                            showControls
                            total={totalPages}
                            initialPage={currentPage}
                            onChange={(page) => dispatch(setCurrentPage(page))}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserLeadsTable;
