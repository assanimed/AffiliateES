import Carousel from "./Carousel";
import { images } from "./images";
import { GoFileZip } from "react-icons/go";
import { LuHardDriveDownload } from "react-icons/lu";

import { Button } from "@nextui-org/react";
import { truncate } from "lodash";
import { Link } from "@inertiajs/react";

const Item = ({ offer }) => {
    return (
        <div className="flex items-center gap-4 shadow px-3 py-2 flex-col xl:flex-row ">
            <div className=" h-full md:h-[230px]  lg:h-[250px] xl:h-[300px] aspect-square">
                <Carousel images={offer?.assets} />
            </div>
            <div className="flex justify-between self-start w-full h-full flex-col gap-3 my-2">
                <div className="w-full">
                    <h3 className="text-left capitalize text-sm md:text-xl font-bold text-slate-600">
                        {offer?.title}
                    </h3>

                    <p className="text-left text-sm mt-2">
                        {truncate(offer?.description, {
                            length: 100,
                        })}
                    </p>
                </div>

                <a
                    href={`/offers/${offer?.id}/download`}
                    className=" bg-indigo-800 py-2 mb-4 rounded-md text-white text-md flex items-center justify-center gap-2"
                >
                    <span>
                        <LuHardDriveDownload />
                    </span>
                    <span>Descargar</span>
                </a>
            </div>
        </div>
    );
};

export default Item;
