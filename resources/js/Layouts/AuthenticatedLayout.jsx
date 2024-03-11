import { useEffect, useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";

import { router } from "@inertiajs/react";
import SideBar from "@/Components/SideBare/SideBar";
import Header from "@/Components/Header";
import { usePage } from "@inertiajs/react";
import { Drawer } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { setIsOpen } from "@/redux/features/drawer/drawerSlice";

export default function Authenticated({ user, children }) {
    const dispatch = useDispatch();
    const { props } = usePage();

    if (!props?.auth?.user?.token) {
        router.post("/logout");
    }

    const isOpen = useSelector((state) => state?.drawer?.isOpen);

    localStorage.setItem("name", props?.auth?.user?.token?.name);

    const handleCloseDrawer = () => {
        dispatch(setIsOpen(false));
    };

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    useEffect(() => {
        dispatch(setIsOpen(false));
    }, []);

    return (
        <div className="min-h-screen h-screen max-h-screen ">
            <div className="h-screen w-full -left-0  fixed flex flex-col top-0">
                <div className=" bg-dashTop flex-1" />
                <div className=" bg-dashBottom flex-1" />
                <div className=" absolute top-0 overflow-y-auto  w-screen max-h-screen min-h-screen h-scren ">
                    <div className="flex h-full">
                        <Drawer
                            opened={isOpen}
                            onClose={handleCloseDrawer}
                            size="xs"
                            overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
                        >
                            <div className="h-screen top-0 left-0 min-w-52 w-60 absolute">
                                <SideBar />
                            </div>
                        </Drawer>
                        <div className=" hidden transition-all ease-linear md:block h-screen relative w-60 min-w-52">
                            <div className="h-screen top-0 left-0 min-w-52 w-60 absolute">
                                <SideBar />
                            </div>
                        </div>
                        <div className=" flex-1">
                            <Header />
                            <main className="py-3 px-5 max-w-[1400px] mx-auto ">
                                {children}
                            </main>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
