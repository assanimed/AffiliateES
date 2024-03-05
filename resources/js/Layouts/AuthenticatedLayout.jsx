import { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";
import SideBar from "@/Components/SideBare/SideBar";
import Header from "@/Components/Header";
import { usePage } from "@inertiajs/react";

export default function Authenticated({ user, children }) {
    const { props } = usePage();
    localStorage.setItem("name", props?.auth?.user?.token?.name);

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen h-screen max-h-screen ">
            <div className="h-screen w-full -left-0  fixed flex flex-col top-0">
                <div className=" bg-dashTop flex-1" />
                <div className=" bg-dashBottom flex-1" />
                <div className=" absolute top-0 overflow-y-auto  w-screen max-h-screen min-h-screen h-scren ">
                    <div className="flex h-full">
                        <div className="bg-indigo-500 h-screen relative w-60 min-w-52">
                            <div className="h-screen top-0 left-0 min-w-52 w-60 absolute">
                                <SideBar links={[]} />
                            </div>
                        </div>
                        <div className=" flex-1">
                            <Header />
                            <main className="py-3 px-5 ">{children}</main>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
