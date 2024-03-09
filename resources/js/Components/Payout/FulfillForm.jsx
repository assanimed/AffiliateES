import { useCreateLeadMutation } from "@/redux/services/leadApi/leadApi";
import { useUpdatePayoutMutation } from "@/redux/services/payoutsApi/payoutsApi";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Divider, Select, SelectItem, Spinner, User } from "@nextui-org/react";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const FulfillForm = () => {
    const {
        props: { payout },
    } = usePage();

    const backLink = useRef();

    const { data, setData, get } = useForm({
        amount: null,
        id: payout?.id,
    });

    const [
        fulfillRequest,
        { error, data: lead, isLoading, isError, isSuccess },
    ] = useUpdatePayoutMutation();

    const submit = (e) => {
        e.preventDefault();

        fulfillRequest(data);
    };

    if (isSuccess) {
        backLink.current.click();
    }

    return (
        <div>
            <form onSubmit={submit} className="w-full bg-white px-5 py-3">
                <Link className="w-0 h-0" ref={backLink} href="/payouts"></Link>
                <div className="px-5 flex  items-center justify-between py-2  font-bold">
                    <h3 className="text-xl"> Fulfill Request</h3>
                    <button
                        // disabled={processing}
                        type="submit"
                        // onClick={() => }
                        className=" disabled:cursor-not-allowed disabled:bg-indigo-300 disabled:hover:text-indigo-500 disabled:hover:bg-indigo-300  text-indigo-500 border-indigo-500 border-2  px-10 py-1.5 rounded-lg  hover:bg-indigo-500 hover:text-white transition-all ease-linear shadow-md"
                    >
                        {isLoading ? <Spinner /> : "Fulfill"}
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

                <div className="mt-5 mb-2 flex flex-col md:flex-row gap-1  items-center md:gap-5 justify-center">
                    <div>
                        <User
                            name={payout?.user?.name}
                            description={
                                <span>{payout?.user?.username ?? "none"}</span>
                            }
                            avatarProps={{
                                src:
                                    payout?.user?.avatar ??
                                    "/avatar/default.png",
                            }}
                        />
                    </div>
                    <div>
                        User Balance:{" "}
                        <span className="text-xl font-bold text-slate-800">
                            $ {payout?.user?.affiliate?.balance}
                        </span>
                    </div>
                </div>

                <div className="mt-5 mb-2">
                    <div>
                        Requested Amount:{" "}
                        <span className="text-xl font-bold text-slate-800">
                            $ {payout?.amount}
                        </span>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="mb-4 flex-1">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="amount"
                        >
                            Renter Amount to confirm
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

export default FulfillForm;
