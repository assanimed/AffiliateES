import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePage, Head, Link } from "@inertiajs/react";
import TopPage from "@/Components/TopPage";
import { BiHomeAlt } from "react-icons/bi";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { HiOutlineUsers } from "react-icons/hi2";
import UsersTable from "@/Components/Admin/UsersTable";
import TableFilter from "@/Components/Admin/TableFilter";

const Users = () => {
    const {
        props: { auth },
    } = usePage();
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Usuarios" />

            <TopPage>
                <div className="text-white md:flex-row flex-col flex items-center gap-3 md:gap-10">
                    <h1 className="text-3xl font-bold">Usuarios</h1>
                    <div className="flex items-center">
                        <Breadcrumbs
                            classNames={{
                                list: "from-violet-500 to-fuchsia-500 shadow-small",
                            }}
                            itemClasses={{
                                item: "text-white/60 data-[current=true]:text-white",
                                separator: "text-white/40",
                            }}
                            className="text-white"
                            color="success"
                        >
                            <BreadcrumbItem
                                className="text-white"
                                startContent={<BiHomeAlt />}
                            >
                                <Link href="/">Inicio</Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem startContent={<HiOutlineUsers />}>
                                Usuarios
                            </BreadcrumbItem>
                        </Breadcrumbs>
                    </div>
                </div>
            </TopPage>
            <div className="bg-white p-2 mt-5 rounded-md">
                <div className="px-5 py-2 text-xl font-bold">
                    <h3>Usuarios</h3>
                </div>

                <div>
                    <TableFilter />
                </div>

                <UsersTable />
            </div>
        </AuthenticatedLayout>
    );
};

export default Users;
