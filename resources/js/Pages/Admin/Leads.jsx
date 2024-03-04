import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePage, Head } from "@inertiajs/react";

const Leads = () => {
    const {
        props: { auth },
    } = usePage();
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Settings" />

            <div>Admin Leads</div>
        </AuthenticatedLayout>
    );
};

export default Leads;
