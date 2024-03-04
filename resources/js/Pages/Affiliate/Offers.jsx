import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePage, Head } from "@inertiajs/react";

const Offers = () => {
    const {
        props: { auth },
    } = usePage();
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Settings" />

            <div>Affiliate Offers</div>
        </AuthenticatedLayout>
    );
};

export default Offers;
