import React from "react";
import { CiSearch } from "react-icons/ci";
import { BiSolidUserBadge } from "react-icons/bi";
import { Avatar } from "@nextui-org/react";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    Button,
} from "@nextui-org/react";
import { Link, usePage } from "@inertiajs/react";
import { HiLogout } from "react-icons/hi";

const Header = () => {
    const {
        props: { auth },
    } = usePage();

    const firstName = auth?.user?.name?.split(" ")[0];

    const avatar = auth?.user?.avatar
        ? auth?.user?.avatar?.url
        : "/avatar/default.png";

    return (
        <div className="py-6 px-5  w-full">
            <div className="flex justify-between w-full">
                {/* <div className="flex bg-white items-center gap-2 shadow-md py-1 px-3 rounded">
                    <div>
                        <CiSearch className="text-2xl font-bold" />
                    </div>

                    <input
                        id="search"
                        name="search"
                        type="text"
                        placeholder="search"
                        className="flex-1 border-none focus:outline-none outline-none border-transparent focus:border-transparent focus:ring-0"
                    />
                </div> */}
                <div></div>
                <div className="flex  items-center gap-2">
                    <span className="text-white font-bold">{firstName}</span>

                    <Popover placement="bottom-end" offset={20} showArrow>
                        <PopoverTrigger className="outline-none focus:outline-none">
                            <button as="button">
                                <Avatar
                                    color="primary"
                                    className="border-2 border-indigo-400 bg-indigo-300"
                                    src={avatar}
                                />
                            </button>
                        </PopoverTrigger>
                        <PopoverContent className="rounded-md">
                            <div className="px-2 py-2">
                                <Link
                                    href="/profile"
                                    className="flex items-center gap-2 hover:text-slate-500   px-5 py-2 rounded"
                                >
                                    <span>Profile</span>
                                    <BiSolidUserBadge />
                                </Link>
                                <hr />
                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    className="flex items-center gap-2 hover:text-slate-500  px-5 py-2 rounded"
                                >
                                    <span>Log out</span>
                                    <HiLogout />
                                </Link>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
            <div></div>
        </div>
    );
};

export default Header;
