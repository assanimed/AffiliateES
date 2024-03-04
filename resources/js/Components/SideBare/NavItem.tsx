import React from "react";

import { Link } from "@inertiajs/react";

const NavItem = ({ href, label, isActive, Icon }) => {
    return (
        <Link
            replace
            href={href}
            className={`  flex items-center gap-2 py-4 px-3 ${
                isActive ? "bg-[#F6F9FC]" : "bg-white hover:bg-[#F6F9FC]"
            }`}
        >
            <span>
                <Icon className="text-2xl" />
            </span>
            <span>{label}</span>
        </Link>
    );
};

export default NavItem;
