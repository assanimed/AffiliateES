import React, { useRef, useState } from "react";
import { CopyButton, ActionIcon, Tooltip, rem } from "@mantine/core";
import { IoCopyOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";

import copy from "copy-text-to-clipboard";

const CouponBoard = ({ coupon }) => {
    const [copied, setCopied] = useState(false);

    const handleCopyCLick = () => {
        setCopied(true);
        copy(coupon);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-white p-3 self-start rounded shadow-md">
            <div>
                <span className="text-[10px] text-gray-400">
                    CÓDIGO PROMOCIONAL
                </span>
            </div>

            <div className="flex flex-col items-center gap-2 bg-indigo-950 py-1 px-2 rounded text-white">
                <div>
                    <h4 className=" text-xs">Su Código de Cupón</h4>
                </div>
                <div>
                    <h2 className=" font-bold text-xl">{coupon}</h2>
                </div>
                <div>
                    <button
                        onClick={handleCopyCLick}
                        className="flex items-center justify-center gap-1 bg-white text-indigo-500 px-3 py-1 rounded text-sm"
                    >
                        {copied ? (
                            <>
                                <span>Copiado</span>
                                <span>
                                    <FaCheck />
                                </span>
                            </>
                        ) : (
                            <>
                                <span>Copiar Código</span>
                                <span>
                                    <IoCopyOutline />
                                </span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CouponBoard;
