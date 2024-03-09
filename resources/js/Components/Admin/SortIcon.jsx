import React from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const SortIcon = ({ active }) => {
    return (
        <button>
            <IoIosArrowUp
                className={`${active === "asc" ? "text-black" : ""} `}
            />
            <IoIosArrowDown
                className={`${active === "desc" ? "text-black" : ""} `}
            />
        </button>
    );
};

export default SortIcon;
