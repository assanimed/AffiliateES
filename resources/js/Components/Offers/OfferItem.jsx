import React from "react";

import { Card, Text, Badge, Button, Group } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { Image } from "@nextui-org/react";
import { truncate } from "lodash";
import { FaFileZipper } from "react-icons/fa6";
import { Link } from "@inertiajs/react";

const OfferItem = ({ offer }) => {
    const poster = offer?.assets?.find((el) => el.type === "image");

    return (
        <div>
            <div className=" flex flex-col gap-1 shadow-md p-1 px-2 max-w-52  justify-center place-self-center">
                <Image
                    className=" min-w-36 h-32"
                    alt="NextUI hero Image"
                    src={`/${poster?.path}`}
                    radius="sm"
                />
                <div className="mt-3 text-md font-bold">
                    <h3>{offer?.title}</h3>
                </div>
                <div className=" text-xs indent-2">
                    {truncate(offer?.description, {
                        length: 100,
                    })}
                </div>
                <div className="mt-3 flex justify-center">
                    <Link
                        href={`/offers/{offer?.id}/download`}
                        className="bg-indigo-600 text-white flex items-center gap-2 px-4 rounded mb-2 py-2"
                    >
                        <span>
                            <FaFileZipper />
                        </span>
                        <span>Descargar</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OfferItem;
