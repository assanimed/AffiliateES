import React from "react";
import { FaPlus } from "react-icons/fa6";
import { Spinner } from "@nextui-org/react";

const AddAssetIcon = ({ handleClick, isLoading }) => {
    7;

    return (
        <button
            as="button"
            type="button"
            onClick={handleClick}
            className=" rounded py-3 w-full flex justify-center items-center h-full  px-6 border-dashed border-2 border-gray-500 "
        >
            {isLoading ? <Spinner /> : <FaPlus className="text-2xl" />}
        </button>
    );
};

export default AddAssetIcon;
