import React from "react";
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
import { useGetAffiliatesQuery } from "@/redux/services/usersApi";
import { useDispatch, useSelector } from "react-redux";

const columns = [
    { name: "USER", uid: "name" },
    { name: "JOINED AT", uid: "joined" },
    { name: "STATUS", uid: "status" },
    { name: "EARNING", uid: "earning" },
    { name: "ACTIONS", uid: "actions" },
];
const users = [
    {
        id: 1,
        name: "Tony Reichert",
        role: "CEO",
        joined: new Date().toDateString(),
        team: "Management",
        status: "active",
        age: "29",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
        email: "tony.reichert@example.com",
    },
    {
        id: 2,
        name: "Zoey Lang",
        role: "Technical Lead",
        joined: new Date().toDateString(),
        team: "Development",
        status: "banned",
        age: "25",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
        email: "zoey.lang@example.com",
    },
    {
        id: 3,
        name: "Jane Fisher",
        role: "Senior Developer",
        joined: new Date().toDateString(),
        team: "Development",
        status: "active",
        age: "22",
        avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
        email: "jane.fisher@example.com",
    },
    {
        id: 4,
        name: "William Howard",
        role: "Community Manager",
        joined: new Date().toDateString(),
        team: "Marketing",
        status: "vacation",
        earning: 111,
        avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
        email: "william.howard@example.com",
    },
    {
        id: 5,
        name: "Kristen Copper",
        role: "Sales Manager",
        joined: new Date().toDateString(),
        team: "Sales",
        status: "active",
        age: "24",
        avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
        email: "kristen.cooper@example.com",
    },
];

const statusColorMap = {
    active: "primary",
    pending: "success",
    banned: "danger",
};

export default function UsersTable() {
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

    const renderCell = React.useCallback((user, columnKey) => {
        const cellValue = user[columnKey];

        switch (columnKey) {
            case "name":
                return (
                    <User
                        avatarProps={{ radius: "lg", src: user.avatar }}
                        description={user.email}
                        name={cellValue}
                    >
                        {user.email}
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
            case "joined":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">
                            {cellValue}
                        </p>
                        <p className="text-bold text-sm capitalize text-default-400">
                            {user.team}
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
                    <div className="relative flex items-center gap-2">
                        <span>meow</span>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    const { data, isSuccess } = useGetAffiliatesQuery({
        status,
        limit,
        page: currentPage,
        search: searchKey,
        sortBy: sortBy,
        sortType,
    });

    if (isSuccess) {
    }

    return (
        <div className="">
            <Table aria-label="Example table with custom cells" shadow="none">
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn
                            key={column.uid}
                            align={
                                column.uid === "actions" ? "center" : "start"
                            }
                        >
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={users}>
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
            <div className="flex justify-end px-14 py-2">
                <Pagination showControls total={10} initialPage={1} />
            </div>
        </div>
    );
}
