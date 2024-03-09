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
    { name: "User", uid: "user" },
    { name: "Amount", uid: "amount" },
    { name: "Status", uid: "status" },
    { name: "Created At", uid: "created_at" },
];

const statusColorMap = {
    paid: "primary",
    request: "success",
};

const HistoryPayoutsTable = ({ data }) => {
    const dispatch = useDispatch();

    const {
        sortType,
        sortBy,
        searchKey,
        status,
        currentPage,
        limit,
        totalPages,
    } = useSelector((state) => state?.paginate);

    const cremappedPayouts = data.map((payout) => ({
        id: payout?.id,
        amount: payout?.amount,
        status: payout?.status,
        created_at: new Date(payout?.created_at).toLocaleDateString() ?? "-",
    }));

    const renderCell = React.useCallback((payout, columnKey) => {
        const cellValue = payout[columnKey];

        switch (columnKey) {
            case "id":
                return <div>{payout.id}</div>;
            case "amount":
                return <div>{payout.amount}</div>;

            case "user":
                return (
                    <User
                        name="Junior Garcia"
                        description={" @jrgarciadev"}
                        avatarProps={{
                            src: payout?.user?.avatar ?? "/avatar/default.png",
                        }}
                    />
                );

            case "status":
                return (
                    <Chip
                        className="capitalize"
                        color={statusColorMap[payout?.status]}
                        size="sm"
                        variant="flat"
                    >
                        {cellValue}
                    </Chip>
                );
            case "created_at":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">
                            {cellValue}
                        </p>
                    </div>
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
                                <div>
                                    <span>{column.name}</span>
                                </div>
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody items={cremappedPayouts}>
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

export default HistoryPayoutsTable;
