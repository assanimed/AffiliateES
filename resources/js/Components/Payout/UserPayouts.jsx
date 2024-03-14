import { Link, usePage } from "@inertiajs/react";
import { useRadioGroup } from "@nextui-org/react";
import React from "react";
import { BiMoneyWithdraw } from "react-icons/bi";
import PayoutsUserHistory from "./PayoutsUserHistory";

const UserPayouts = () => {
    const {
        props: { affiliate, minPayout },
    } = usePage();

    return (
        <div>
            <div className="max-w-[300px] shadow-md rounded p-2 m-2">
                <h3 className="text-2xl text-slate-700 font-bold">Saldo</h3>
                <div className="text-3xl text-slate-500 my-5 font-bold">
                    $ {affiliate?.balance}
                </div>
                {parseFloat(affiliate?.balance) >= minPayout ? (
                    <Link
                        href="/payouts/request"
                        className=" inline-flex items-center  gap-2 my-2 border-2 px-2 py-1.5 rounded text-indigo-500 border-blue-400"
                    >
                        <BiMoneyWithdraw />
                        Solicitar pago
                    </Link>
                ) : (
                    <span className="text-red-600 text-xs">
                        Monto Mínimo de Pago {minPayout}$
                    </span>
                )}
            </div>

            <div>
                <PayoutsUserHistory user={useRadioGroup} />
            </div>
        </div>
    );
};

export default UserPayouts;
