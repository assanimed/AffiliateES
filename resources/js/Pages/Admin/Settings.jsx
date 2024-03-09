import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePage, Head, Link } from "@inertiajs/react";
import TopPage from "@/Components/TopPage";
import SettingsForm from "@/Components/Admin/SettingsForm";

const Settings = ({ settingsData }) => {
    const {
        props: { auth },
    } = usePage();
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Manage Offers" />

            <div className="text-white flex items-center gap-3 md:gap-10"></div>
            <TopPage>
                <div className="text-white flex items-center justify-center gap-3 md:gap-10">
                    <h1 className="text-3xl font-bold text-center">
                        Site Settings
                    </h1>
                </div>
            </TopPage>
            <div className="bg-white p-2 mt-5 rounded-md">
                <div>
                    <SettingsForm settingsData={settingsData} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Settings;
