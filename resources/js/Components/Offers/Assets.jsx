import React, { useEffect, useState } from "react";
import AddAssetIcon from "./AddAssetIcon";
import AssetPreview from "./AssetPreview";
import { useDispatch, useSelector } from "react-redux";
import { setData, setFile } from "@/redux/features/upload/uploadSlice";
import { AiOutlineConsoleSql } from "react-icons/ai";
import {
    useDeleteAssetMutation,
    useUploadAssetMutation,
} from "@/redux/services/assetsApi/assetsApi";
import {
    addAsset,
    removeAsset,
    setToBeDeleted,
} from "@/redux/features/offer/offerSlice";

const Assets = ({ assets }) => {
    const { assets: assetsData, tobeDeleted } = useSelector(
        (state) => state.offer
    );

    const [error, setError] = useState(null);
    const [file, setFile] = useState(null);
    const [newAsset, setNewAsset] = useState(null);
    const dispatch = useDispatch();

    const [uploadAsset, { data, isSuccess, isError, isLoading }] =
        useUploadAssetMutation();

    const [deleteAsset, delAsset] = useDeleteAssetMutation();

    const handleFile = (e) => {
        const size = e.target.files[0].size / 1024 / 1024;

        if (size > 10) {
            setError("file Size Exceeded 10MB");
            return;
        }

        const fileData = e.target.files[0];

        // console.log(file);
        setFile(fileData);
        // dispatch(setFile());
    };

    const handleDelete = async (id) => {
        // alert(`Delete ${id}`);

        dispatch(setToBeDeleted(id));

        await deleteAsset({ id });
    };

    const handleClick = () => {
        const file = document.createElement("input");
        file.type = "file";
        file.accept =
            "image/jpeg, image/png, image/webp, video/mp4, video/avi, video/x-matroska";
        file.addEventListener("change", handleFile);

        file.click();
    };

    const uploadAssetFile = async (file) => {
        const formData = new FormData();
        formData.append("file", file);

        await uploadAsset(formData);
    };

    useEffect(() => {
        if (file) {
            uploadAssetFile(file);
            setFile(null);
        }

        if (isError) {
            setError("Failed to Upload Asset");
            setTimeout(() => setError(null), 5500);
        }
    }, [file, isSuccess, isError, isLoading]);

    useEffect(() => {
        if (isSuccess && !isError && !isLoading) {
            dispatch(setData(data));
            dispatch(addAsset(data?.asset));
        }
    }, [isSuccess]);

    useEffect(() => {
        if (delAsset?.isSuccess) {
            dispatch(setData(null));
            dispatch(removeAsset(parseInt(delAsset?.data?.asset?.id)));
            dispatch(setToBeDeleted(null));
        }
    }, [delAsset?.isSuccess]);

    return (
        <>
            <div className="py-3 px-1.5 border-2 border-slate-300 justify-stretch rounded flex flex-col gap-4">
                <div className="flex gap-3 flex-wrap justify-center">
                    {assetsData?.map((asset) => (
                        <AssetPreview
                            key={asset?.key}
                            asset={asset}
                            handleDelete={handleDelete}
                            deleting={delAsset?.isLoading}
                            tobeDeleted={tobeDeleted}
                        />
                    ))}
                </div>
                <div className="">
                    <AddAssetIcon
                        handleClick={handleClick}
                        isLoading={isLoading}
                    />
                </div>
            </div>
            {error && (
                <div className="py-2 text-sm text-red-500">
                    {" "}
                    Error: {error}, try again .
                </div>
            )}
        </>
    );
};

export default Assets;
