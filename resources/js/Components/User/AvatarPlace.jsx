import { useDeleteLogoMutation } from "@/redux/services/settingsApi/settingsApi";
import { Image, Spinner } from "@nextui-org/react";
import React, { useEffect } from "react";
import { FaPlus } from "react-icons/fa";

const AvatarPlace = ({
    image,
    setData,
    file,
    handleSave,
    handleDelete,
    isLoading,
}) => {
    const handleFile = (e) => {
        const size = e.target.files[0].size / 1024 / 1024;

        if (size > 10) {
            setError("El archivo excede el tamaño máximo de 10MB");
            return;
        }

        const fileData = e.target.files[0];

        setData("avatar", fileData);
    };

    const handleClick = () => {
        const file = document.createElement("input");
        file.type = "file";
        file.accept = "image/jpeg, image/png, image/svg";
        file.addEventListener("change", handleFile);

        file.click();
    };

    return (
        <div className="flex flex-col  gap-2">
            {image || file ? (
                <div className="relative w-40 ">
                    <Image
                        src={file ? URL.createObjectURL(file) : image}
                        className="w-40 border-2 border-slate-200"
                    />
                    {isLoading ? (
                        <div className=" flex place-content-center bg-slate-50 opacity-70 w-40 h-full absolute z-20 top-0 left-0 ">
                            <Spinner />
                        </div>
                    ) : (
                        ""
                    )}
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

            {file ? (
                <button
                    type="button"
                    as="button"
                    disabled={isLoading}
                    onClick={handleSave}
                    className="px-5 py-2 bg-indigo-500 text-white max-w-40 rounded"
                >
                    Guardar
                </button>
            ) : (
                <button
                    type="button"
                    as="button"
                    disabled={isLoading}
                    onClick={handleClick}
                    className="px-5 py-2 bg-indigo-500 text-white max-w-40 rounded"
                >
                    Cambiar
                </button>
            )}
            {image || file ? (
                <>
                    {image ? (
                        <button
                            type="button"
                            as="button"
                            disabled={isLoading}
                            onClick={handleDelete}
                            className="px-5 py-2 bg-red-500 text-white max-w-40 rounded"
                        >
                            {isLoading ? "Eliminando..." : "Eliminar"}
                        </button>
                    ) : (
                        <button
                            type="button"
                            as="button"
                            disabled={isLoading}
                            onClick={() => setData("avatar", null)}
                            className="px-5 py-2 bg-red-500 text-white max-w-40 rounded"
                        >
                            Eliminar
                        </button>
                    )}
                </>
            ) : (
                ""
            )}
        </div>
    );
};

export default AvatarPlace;
