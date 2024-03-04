import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePage, Head } from "@inertiajs/react";

const Dashboard = () => {
    const {
        props: { auth },
    } = usePage();
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Settings" />

            <div>Affiliate Dashboard</div>
        </AuthenticatedLayout>
    );
};

export default Dashboard;
