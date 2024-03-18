import React, { Suspense, lazy } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePage, Head, Link } from "@inertiajs/react";
import TopPage from "@/Components/TopPage";
import { Spinner, Tab, Tabs } from "@nextui-org/react";

const UpdateUser = lazy(() => import("../../Components/User/UpdateUser"));
const UserAvatar = lazy(() => import("../../Components/User/UserAvatar"));

const Settings = ({ settingsData }) => {
    const {
        props: { auth },
    } = usePage();
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Configuración del Perfil" />

            <div className="text-white flex items-center gap-3 md:gap-10"></div>
            <TopPage>
                <div className="text-white md:flex-row flex-col flex items-center justify-center gap-3 md:gap-10">
                    <h1 className="text-3xl font-bold text-center">
                        Configuración del Perfil
                    </h1>
                </div>
            </TopPage>

            <div className="bg-white p-2 mt-5 rounded-md">
                <div>
                    <div className="flex w-full  flex-col">
                        <Tabs
                            aria-label="Options"
                            classNames={{
                                tabList:
                                    "gap-6 rounded relative  w-96 px-5 border-divider",
                                cursor: "w-full bg-indigo-500",
                                tab: "px-15",
                                tabContent:
                                    "group-data-[selected=true]:text-white px-5 rounded-none",
                            }}
                        >
                            <Tab key="Perfil" title="Perfil">
                                <div>
                                    <Suspense
                                        fallback={
                                            <div className="flex flex-col justify-center items-center gap-3 my-5">
                                                <Spinner size="lg" />{" "}
                                            </div>
                                        }
                                    >
                                        <UpdateUser />
                                    </Suspense>
                                </div>
                            </Tab>
                            <Tab key="Avatar" title="Avatar">
                                <div>
                                    <Suspense
                                        fallback={
                                            <div className="flex flex-col justify-center items-center gap-3 my-5">
                                                <Spinner size="lg" />{" "}
                                            </div>
                                        }
                                    >
                                        <UserAvatar />
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

export default Settings;
