import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePage, Head, Link } from "@inertiajs/react";
import TopPage from "@/Components/TopPage";
import { BiHomeAlt } from "react-icons/bi";
import { BreadcrumbItem, Breadcrumbs, Divider } from "@nextui-org/react";
import { HiOutlineUsers } from "react-icons/hi2";
import { FaUser } from "react-icons/fa";
import EditForm from "@/Components/Admin/EditForm";

const Users = ({ user }) => {
    console.log("USER", user);

    const [info, setInfo] = useState(user);
    const {
        props: { auth },
    } = usePage();

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Edit User" />
            <div className="text-white flex items-center gap-3 md:gap-10"></div>
            <TopPage>
                <div className="text-white flex items-center gap-3 md:gap-10">
                    <h1 className="text-3xl font-bold">User</h1>
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
                                <Link href="/">Home</Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem startContent={<HiOutlineUsers />}>
                                <Link href="/users">Users</Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem startContent={<FaUser />}>
                                {user?.name}
                            </BreadcrumbItem>
                        </Breadcrumbs>
                    </div>
                </div>
            </TopPage>
            <div className="bg-white p-2 mt-5 rounded-md">
                <div>
                    <EditForm errors={{}} user={info} setInfo={setInfo} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Users;
