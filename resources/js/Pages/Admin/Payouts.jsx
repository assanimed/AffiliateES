import React, { Suspense, lazy } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePage, Head, Link } from "@inertiajs/react";
import TopPage from "@/Components/TopPage";
import { Badge, BreadcrumbItem, Breadcrumbs, Spinner } from "@nextui-org/react";
import { BiHomeAlt } from "react-icons/bi";
import { MdOutlinePayments } from "react-icons/md";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";

const PayoutsRequests = lazy(() =>
    import("@/Components/Payout/PayoutsRequests")
);
const PayoutsHistory = lazy(() => import("@/Components/Payout/PayoutsHistory"));

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
                    <h1 className="text-3xl font-bold">Payouts</h1>
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
                                Payout
                            </BreadcrumbItem>
                        </Breadcrumbs>
                    </div>
                </div>
            </TopPage>
            <div className="bg-white p-2 mt-5 rounded-md">
                <div>
                    <div className="flex w-full flex-col">
                        <Tabs
                            aria-label="Options"
                            classNames={{
                                tabList:
                                    "gap-6 rounded relative px-5 border-divider",
                                cursor: "w-full bg-indigo-500",
                                tab: "px-15",
                                tabContent:
                                    "group-data-[selected=true]:text-white px-5 rounded-none",
                            }}
                        >
                            <Tab key="Requests" title="Request">
                                <div>
                                    <Suspense
                                        fallback={
                                            <div className="flex flex-col justify-center items-center gap-3 my-5">
                                                <Spinner size="lg" />{" "}
                                            </div>
                                        }
                                    >
                                        <PayoutsRequests />
                                    </Suspense>
                                </div>
                            </Tab>
                            <Tab key="History" title="History">
                                <div>
                                    <Suspense
                                        fallback={
                                            <div className="flex flex-col justify-center items-center gap-3 my-5">
                                                <Spinner size="lg" />{" "}
                                            </div>
                                        }
                                    >
                                        <PayoutsHistory />
                                    </Suspense>
                                </div>
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Payouts;
