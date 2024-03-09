import { Link } from "@inertiajs/react";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import React from "react";
import { CiEdit } from "react-icons/ci";

const EditPopOver = ({ children, link }) => {
    return (
        <div>
            <Popover placement="bottom" offset={8} showArrow>
                <PopoverTrigger className="outline-none focus:outline-none">
                    {children}
                </PopoverTrigger>
                <PopoverContent className="rounded-md">
                    <div className="">
                        <Link
                            href={link}
                            className="flex items-center gap-2 hover:text-slate-500  px-5 py-2 rounded"
                        >
                            <CiEdit />
                            <span>Edit</span>
                        </Link>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default EditPopOver;
