import React from "react";
import UpdateForm from "./UpdateForm";
import { usePage } from "@inertiajs/react";

const UpdateUser = () => {
    const {
        props: { user },
    } = usePage();

    return (
        <div>
            <UpdateForm user={user} />
        </div>
    );
};

export default UpdateUser;
