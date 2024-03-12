import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePage, Head, Link } from "@inertiajs/react";
import TopPage from "@/Components/TopPage";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { BiHomeAlt } from "react-icons/bi";
import { MdOutlinePayments } from "react-icons/md";
import UserPayouts from "@/Components/Payout/UserPayouts";
import PayoutForm from "@/Components/Payout/PayoutForm";

const Payouts = () => {
    const {
        props: { auth },
    } = usePage();
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Manage Payments" />

            <div className="text-white flex items-center gap-3 md:gap-10"></div>
            <TopPage>
                <div className="text-white flex items-center gap-3 md:gap-10">
                    <h1 className="text-3xl font-bold">Payments</h1>
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
                            <BreadcrumbItem
                                startContent={<MdOutlinePayments />}
                            >
                                <Link href="/payouts">Payouts</Link>
                            </BreadcrumbItem>

                            <BreadcrumbItem
                                startContent={<MdOutlinePayments />}
                            >
                                Request
                            </BreadcrumbItem>
                        </Breadcrumbs>
                    </div>
                </div>
            </TopPage>
            <div className="bg-white p-2 mt-5 rounded-md">
                <div>
                    <PayoutForm />
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Payouts;
