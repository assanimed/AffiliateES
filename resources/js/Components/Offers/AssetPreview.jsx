import React from "react";

import { Image, Spinner } from "@nextui-org/react";
import { MdDelete } from "react-icons/md";

const AssetPreview = ({ asset, handleDelete, deleting, tobeDeleted }) => {
    const type = asset?.type;
    return (
        <div className="relative">
            {type === "image" ? (
                <Image
                    width={150}
                    className=" min-w-36"
                    alt="NextUI hero Image"
                    src={`/${asset?.path}`}
                />
            ) : (
                <>
                    <div>
                        <video controls className="w-36 rounded-xl  min-w-36">
                            <source src={`/${asset?.path}`} />
                        </video>
                    </div>
                </>
            )}
            <>
                {deleting && tobeDeleted === asset?.id ? (
                    <div className=" bg-white text-white  flex text-2xl items-center p-1 border border-slate-300 rounded-full absolute top-0 left-0 z-10 ">
                        <Spinner size="sm" className="" />
                    </div>
                ) : (
                    <button
                        as="button"
                        type="button"
                        onClick={() => handleDelete(asset?.id)}
                        className=" bg-red-500 text-white text-2xl flex items-center p-1 rounded-full absolute top-0 left-0 z-10 "
                    >
                        <MdDelete />
                    </button>
                )}
            </>
        </div>
    );
};

export default AssetPreview;
