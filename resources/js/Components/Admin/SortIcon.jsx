import React from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const SortIcon = ({ active }) => {
    return (
        <button>
            <IoIosArrowUp
                className={`${active === "desc" ? "text-black" : ""} `}
            />
            <IoIosArrowDown
                className={`${active === "asc" ? "text-black" : ""} `}
            />
        </button>
    );
};

export default SortIcon;
