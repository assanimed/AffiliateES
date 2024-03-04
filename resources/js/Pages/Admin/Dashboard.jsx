import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePage, Head } from "@inertiajs/react";
import TopPage from "@/Components/TopPage";

const Dashboard = () => {
    const {
        props: { auth },
    } = usePage();
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />

            <TopPage />
        </AuthenticatedLayout>
    );
};

export default Dashboard;
