import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlArrowLeftCircle } from "react-icons/sl";
import { SlArrowRightCircle } from "react-icons/sl";
import { Image } from "@nextui-org/react";

const Carousel = ({ images }) => {
    const [current, setCurrent] = useState(0);

    const handleNext = () => {
        setCurrent((prevIndex) =>
            prevIndex + 1 === images.length ? 0 : prevIndex + 1
        );
    };
    const handlePrevious = () => {
        setCurrent((prevIndex) =>
            prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1
        );
    };
    const handleDotClick = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div className=" relative  w-full h-full flex flex-col justify-center">
            {images[current]?.type === "image" ? (
                <Image
                    className="  h-full w-full aspect-square"
                    alt="NextUI hero Image"
                    src={`/${images[current]?.path}`}
                    radius="sm"
                />
            ) : (
                <>
                    <div>
                        <video
                            controls
                            autoplay
                            className="w-full aspect-square"
                        >
                            <source
                                autoplay
                                src={`/${images[current]?.path}`}
                            />
                        </video>
                    </div>
                </>
            )}
            <div className="absolute group z-50 top-0 w-full h-full flex items-center ">
                <div className="w-full hidden group-hover:flex transition-all ease-linear justify-between px-1">
                    <button
                        onClick={handlePrevious}
                        className="bg-white p-0.5 rounded-full"
                    >
                        <SlArrowLeftCircle className="text-black" />
                    </button>
                    <button
                        onClick={handleNext}
                        className="bg-white p-0.5 rounded-full"
                    >
                        <SlArrowRightCircle className="text-black" />
                    </button>
                </div>
            </div>

            <div className="absolute z-40 top-0 w-full h-full flex items-end justify-center ">
                <div className="mb-3 flex items-center gap-1">
                    {images?.map((_, index) => (
                        <>
                            {index === current ? (
                                <div className="h-1 w-5 bg-white rounded transition-all ease-linear"></div>
                            ) : (
                                <div className="h-1 w-1 bg-white rounded transition-all ease-linear"></div>
                            )}
                        </>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Carousel;
