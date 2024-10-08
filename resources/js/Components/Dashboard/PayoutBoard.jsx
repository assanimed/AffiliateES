import React from "react";
import { Link } from "@inertiajs/react";

const PayoutBoard = ({ balance, minPayout }) => {
    console.log("min", minPayout);
    return (
        <div className="bg-white p-3 self-start rounded shadow-md flex flex-col items-center gap-2">
            <h3 className="text-slate-400 text-xl">Payout Request</h3>
            <h4>
                <span className=" text-gray-500">Total Balance:</span>{" "}
                <span className="text-red-400 font-bold text-xl">
                    {balance} $
                </span>
            </h4>
            <div>
                {balance >= minPayout ? (
                    <Link
                        href="/payouts/request"
                        className="bg-indigo-500 px-3 my-2 inline-block py-1.5 rounded text-white"
                    >
                        Request Payout
                    </Link>
                ) : (
                    <span className="text-gray-600 text-[10px]">
                        You didn't reach Min Payout of {minPayout}$
                    </span>
                )}
            </div>
        </div>
    );
};

export default PayoutBoard;
