import React from "react";

const GridItem = ({ text, value, Icon, diff }) => {
    return (
        <div className="bg-white px-3 self-start shadow-md py-3 rounded">
            <div className="flex justify-between">
                <div className="flex flex-col text-xs gap-1">
                    <span className="text-slate-500">{text}</span>
                    <span className="text-xl text-gray-700">{value}</span>
                </div>
                <div>{Icon}</div>
            </div>
            <div className="text-xs font-light mt-3">
                <span className="text-red-500">
                    {diff > 0 ? "+" : ""}
                    {parseInt(diff)}%
                </span>
                <span className="text-gray-800 inline-block px-3">
                    Desde el Mes Pasado
                </span>
            </div>
        </div>
    );
};

export default GridItem;
