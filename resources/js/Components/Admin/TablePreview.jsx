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
} from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import {
    setCurrentPage,
    setPageLimit,
} from "@/redux/features/paginate/paginateSlice";
import { BsThreeDotsVertical } from "react-icons/bs";
import EditPopOver from "./EditPopOver";
import SortIcon from "./SortIcon";
import {
    setSearchKey,
    setSortBy,
    setSortType,
} from "@/redux/features/paginate/filterSlice";

const columns = [
    { name: "USER", uid: "name" },
    { name: "JOINED AT", uid: "created_at" },
    { name: "STATUS", uid: "status" },
    { name: "EARNING", uid: "earning" },
    { name: "ACTIONS", uid: "actions" },
];

const statusColorMap = {
    active: "primary",
    pending: "success",
    banned: "danger",
};

const TablePreview = ({ users }) => {
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

    const mappedUsers = users.map((user) => ({
        id: user?.id,
        name: user?.name,
        username: user?.username,
        status: user?.affiliate?.status,
        created_at: new Date(user?.created_at).toLocaleDateString(),
        earning: user?.affiliate?.earning,
        avatar: user?.avatar?.url ?? "/avatar/default.png",
        email: user?.profile?.email
            ? user?.profile?.email
            : user?.profile?.phone_number
            ? user?.profile?.phone_number
            : "none",
    }));

    const SortTable = (by) => {
        dispatch(setSortBy(by));
        if (!sortType || sortType === "" || by !== sortBy) {
            dispatch(setSortType("desc"));
        } else {
            dispatch(setSortType(sortType === "asc" ? "desc" : "asc"));
        }
    };

    const renderCell = React.useCallback((user, columnKey) => {
        const cellValue = user[columnKey];

        switch (columnKey) {
            case "name":
                return (
                    <User
                        avatarProps={{ radius: "lg", src: user.avatar }}
                        description={user.username}
                        name={cellValue}
                    >
                        {user.username}
                    </User>
                );
            case "earning":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">
                            <span className="font-bold text-md">
                                {" "}
                                &#36; {cellValue}
                            </span>
                        </p>
                    </div>
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
                        color={statusColorMap[user.status]}
                        size="sm"
                        variant="flat"
                    >
                        {cellValue}
                    </Chip>
                );
            case "actions":
                return (
                    <div className="relative flex items-center justify-center gap-2">
                        <EditPopOver link={`/users/${user?.id}/edit`}>
                            <button className=" cursor-pointer bg-white rounded-full shadow-lg px-2 py-2">
                                <BsThreeDotsVertical />
                            </button>
                        </EditPopOver>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <div>
            <div className="">
                <Table
                    aria-label="Example table with custom cells"
                    shadow="none"
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
                                {column.uid === "actions" ? (
                                    <div>
                                        <span>{column.name}</span>
                                    </div>
                                ) : (
                                    <div
                                        className="flex items-center gap-2 cursor-pointer"
                                        as="button"
                                        onClick={() => SortTable(column.uid)}
                                    >
                                        <span>{column.name}</span>
                                        <span>
                                            <SortIcon
                                                active={
                                                    column.uid === sortBy
                                                        ? sortType
                                                        : "none"
                                                }
                                            />
                                        </span>
                                    </div>
                                )}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody items={mappedUsers}>
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

export default TablePreview;
