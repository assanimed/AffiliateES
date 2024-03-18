import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePage, Head, Link } from "@inertiajs/react";
import TopPage from "@/Components/TopPage";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { BiHomeAlt } from "react-icons/bi";
import { HiOutlineUsers } from "react-icons/hi2";
import { FaUser } from "react-icons/fa";
import OffersList from "@/Components/Offers/OffersList";
import { IoMagnetOutline } from "react-icons/io5";
import LeadsList from "@/Components/Leads/LeadsList";
import DashboardGrid from "@/Components/Dashboard/DashboardGrid";

const Dashboard = () => {
    const {
        props: { auth },
    } = usePage();
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Panel de Control" />

            <div className="text-white flex items-center gap-3 md:gap-10"></div>
            <TopPage>
                <div className="text-white md:flex-row flex-col flex items-center gap-3 md:gap-10">
                    <h1 className="text-3xl font-bold">Panel de Control</h1>
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
                            <BreadcrumbItem>Panel de Control</BreadcrumbItem>
                        </Breadcrumbs>
                    </div>
                </div>
            </TopPage>
            <div className=" p-2 mt-5 rounded-md">
                <div>
                    <DashboardGrid />
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Dashboard;
