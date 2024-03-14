import { useCreateLeadMutation } from "@/redux/services/leadApi/leadApi";
import { useRequestPayoutMutation } from "@/redux/services/payoutsApi/payoutsApi";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Divider, Select, SelectItem, Spinner } from "@nextui-org/react";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const PayoutForm = () => {
    const {
        props: { auth, minPayout },
    } = usePage();

    const backLink = useRef();

    const { data, setData, get } = useForm({
        amount: null,
        user_id: auth?.user?.id,
    });

    const [
        reaquestPayout,
        { error, data: lead, isLoading, isError, isSuccess },
    ] = useRequestPayoutMutation();

    const submit = (e) => {
        e.preventDefault();

        reaquestPayout(data);
    };

    if (isSuccess) {
        backLink.current.click();
    }

    return (
        <div>
            <form onSubmit={submit} className="w-full bg-white px-5 py-3">
                <Link className="w-0 h-0" ref={backLink} href="/payouts"></Link>
                <div className="px-5 flex  items-center justify-between py-2  font-bold">
                    <h3 className="text-xl"> Solicitar un pago</h3>
                    <button
                        // disabled={processing}
                        type="submit"
                        // onClick={() => }
                        className=" disabled:cursor-not-allowed disabled:bg-indigo-300 disabled:hover:text-indigo-500 disabled:hover:bg-indigo-300  text-indigo-500 border-indigo-500 border-2  px-10 py-1.5 rounded-lg  hover:bg-indigo-500 hover:text-white transition-all ease-linear shadow-md"
                    >
                        {isLoading ? <Spinner /> : "Solicitud"}
                    </button>
                </div>

                <Divider
                    my="md"
                    className="bg-slate-300 h-[2px] mb-10 rounded-full"
                />
                <div>
                    {isError && (
                        <span className="bg-red-500 px-2 py-1.5 text-sm block w-full rounded text-white my-3">
                            {error?.data?.error}
                        </span>
                    )}
                </div>

                <div className="mt-5 mb-2">
                    <div>
                        <span>Tu saldo:</span>
                        <span className="text-xl px-3 font-bold text-slate-800">
                            $ {auth?.user?.affiliate?.balance}
                        </span>
                    </div>
                    <span className="text-red-600 text-xs">
                        Monto Mínimo de Pago {minPayout}$
                    </span>
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="mb-4 flex-1">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="amount"
                        >
                            Monto del pago
                        </label>
                        <input
                            className="shadow inline-block appearance-none border-2 border-slate-300 rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="amount"
                            type="number"
                            value={data?.amount}
                            onChange={(e) => setData("amount", e.target.value)}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default PayoutForm;
