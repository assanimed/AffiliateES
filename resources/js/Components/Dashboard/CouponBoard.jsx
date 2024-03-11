import React, { useRef } from "react";
import { CopyButton, ActionIcon, Tooltip, rem } from "@mantine/core";
import { IoCopyOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";

const CouponBoard = ({ coupon }) => {
    const copyFun = useRef();

    const handleCopyCLick = () => {
        copyFun?.current();
    };

    return (
        <div className="bg-white p-3 self-start rounded shadow-md">
            <div>
                <span className="text-[10px] text-gray-400">
                    PROMOTIONAL CODE
                </span>
            </div>

            <div className="flex flex-col items-center gap-2 bg-indigo-950 py-1 px-2 rounded text-white">
                <div>
                    <h4 className=" text-xs">Your Coupon Code</h4>
                </div>
                <div>
                    <h2 className=" font-bold text-xl">{coupon}</h2>
                </div>
                <div>
                    <button
                        onClick={handleCopyCLick}
                        className="flex items-center justify-center gap-1 bg-white text-indigo-500 px-3 py-1 rounded text-sm"
                    >
                        <span>Copy Code</span>
                        <CopyButton value={coupon} timeout={2000}>
                            {({ copied, copy }) => {
                                copyFun.current = copy;

                                return (
                                    <Tooltip
                                        label={copied ? "Copied" : "Copy"}
                                        withArrow
                                        position="right"
                                    >
                                        <ActionIcon
                                            color={copied ? "teal" : "gray"}
                                            variant="subtle"
                                            onClick={copy}
                                        >
                                            {copied ? (
                                                <FaCheck />
                                            ) : (
                                                <IoCopyOutline />
                                            )}
                                        </ActionIcon>
                                    </Tooltip>
                                );
                            }}
                        </CopyButton>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CouponBoard;
