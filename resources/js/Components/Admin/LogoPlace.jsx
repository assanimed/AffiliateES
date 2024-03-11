import { useDeleteLogoMutation } from "@/redux/services/settingsApi/settingsApi";
import { Image, Spinner } from "@nextui-org/react";
import React, { useEffect } from "react";
import { FaPlus } from "react-icons/fa";

const LogoPlace = ({ image, setData, file }) => {
    const handleFile = (e) => {
        const size = e.target.files[0].size / 1024 / 1024;

        if (size > 10) {
            setError("file Size Exceeded 10MB");
            return;
        }

        const fileData = e.target.files[0];

        // console.log(file);
        setData("logoFile", fileData);
        // dispatch(setFile());
    };

    const [deleteLogo, { data, isLoading, isSuccess, isError }] =
        useDeleteLogoMutation();

    const handleClick = () => {
        const file = document.createElement("input");
        file.type = "file";
        file.accept = "image/jpeg, image/png, image/svg";
        file.addEventListener("change", handleFile);

        file.click();
    };

    const handleDelete = () => {
        deleteLogo();
    };

    useEffect(() => {
        if (isSuccess) {
            setData("logoFile", null);
            setData("logoImage", null);
        }
    }, [isSuccess]);

    return (
        <div className="flex flex-col gap-2">
            {image || file ? (
                <div>
                    <Image
                        src={file ? URL.createObjectURL(file) : image}
                        className="w-40 border-2 border-slate-200"
                    />
                </div>
            ) : (
                <button
                    type="button"
                    as="button"
                    onClick={handleClick}
                    className=" w-40 aspect-square border-2 border-dashed flex  justify-center items-center"
                >
                    <FaPlus />
                </button>
            )}

            <button
                type="button"
                as="button"
                onClick={handleClick}
                className="px-5 py-2 bg-indigo-500 text-white max-w-40 rounded"
            >
                Change
            </button>
            {image ? (
                <button
                    type="button"
                    as="button"
                    disabled={isLoading}
                    onClick={handleDelete}
                    className="px-5 py-2 bg-red-500 text-white max-w-40 rounded"
                >
                    {isLoading ? "Deleting..." : "Delete"}
                </button>
            ) : (
                ""
            )}
        </div>
    );
};

export default LogoPlace;
