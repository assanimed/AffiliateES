import { useForm, usePage } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import {
    useDeleteAvatarMutation,
    useUpdateAvatarMutation,
} from "@/redux/services/usersApi";
import AvatarPlace from "./AvatarPlace";

const UserAvatar = () => {
    const {
        props: { user },
    } = usePage();

    const { data, setData } = useForm({
        avatar: null,
        image: user?.avatar?.url,
    });

    const [
        updateAvatar,
        {
            data: updateData,
            isLoading: isUpdateLoading,
            isError: isUpdateError,
            isSuccess: isUpdateSUccess,
        },
    ] = useUpdateAvatarMutation();
    const [
        deleteAvatar,
        {
            data: deleteData,
            isLoading: isDeleteLoading,
            isError: isDeleteError,
            isSuccess: isDeleteSUccess,
        },
    ] = useDeleteAvatarMutation();

    const handleSave = () => {
        const formData = new FormData();

        if (data?.avatar) {
            formData.append("avatar", data?.avatar);
        }
        updateAvatar(formData);
    };

    const handleDelete = () => {
        deleteAvatar();
    };

    const [showInfo, setShowInfo] = useState(false);

    useEffect(() => {
        if (isDeleteSUccess) {
            setData("image", null);
        }

        if (
            isUpdateSUccess ||
            isDeleteSUccess ||
            isDeleteError ||
            isUpdateError
        ) {
            setShowInfo(true);
            setTimeout(() => setShowInfo(false), 5000);
        }
    }, [isUpdateSUccess, isUpdateSUccess, isDeleteSUccess, isUpdateError]);

    useEffect(() => {
        if (isUpdateSUccess) {
            setData("image", updateData?.url);
            setData("file", null);
        }
    }, [isUpdateSUccess, updateData]);

    return (
        <div>
            <div>
                {(isUpdateError || isDeleteError) && showInfo ? (
                    <div className="bg-red-500 text-white px-2 py-1 rounded">
                        {isUpdateError
                            ? "Error al actualizar el avatar"
                            : "Error al eliminar el avatar"}
                    </div>
                ) : (
                    ""
                )}

                {(isDeleteSUccess || isUpdateSUccess) && showInfo ? (
                    <div className="bg-indigo-500 text-white px-2 py-1 rounded">
                        {isUpdateSUccess
                            ? "El avatar se ha actualizado exitosamente"
                            : "El avatar ha sido eliminado exitosamente"}
                    </div>
                ) : (
                    ""
                )}
            </div>
            <div className="mb-4 flex-1">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    for="logoImage"
                >
                    Establecer Avatar/Imagen de Perfil
                </label>
                <AvatarPlace
                    handleSave={handleSave}
                    handleDelete={handleDelete}
                    file={data?.avatar}
                    image={data?.image}
                    setData={setData}
                    isLoading={isDeleteLoading || isUpdateLoading}
                />
            </div>
        </div>
    );
};

export default UserAvatar;
