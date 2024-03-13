import { useCreateLeadMutation } from "@/redux/services/leadApi/leadApi";
import { Link, useForm } from "@inertiajs/react";
import { Divider, Select, SelectItem, Spinner } from "@nextui-org/react";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const LeadForm = () => {
    const backLink = useRef();
    // const assets = useSelector((state) => state?.offer?.assets);

    const statuses = ["shipped", "pending"];
    const handleStatusChange = (e) => setData("status", e.target.value);

    const { data, setData, get } = useForm({
        username: "",
        coupon: "",
        status: "",
    });

    const [createLead, { error, data: lead, isLoading, isError, isSuccess }] =
        useCreateLeadMutation();

    const submit = (e) => {
        e.preventDefault();

        if (!data.username && !data?.coupon) return;

        createLead(data);
    };

    if (isError) {
        console.log("Error", error?.data?.error);
    }

    if (isSuccess) {
        backLink.current.click();
    }

    return (
        <div>
            <form onSubmit={submit} className="w-full bg-white px-5 py-3">
                <Link className="w-0 h-0" ref={backLink} href="/leads"></Link>
                <div className="px-5 flex  items-center justify-between py-2  font-bold">
                    <h3 className="text-xl">Submit New Lead</h3>
                    <button
                        // disabled={processing}
                        type="submit"
                        // onClick={() => }
                        className=" disabled:cursor-not-allowed disabled:bg-indigo-300 disabled:hover:text-indigo-500 disabled:hover:bg-indigo-300  text-indigo-500 border-indigo-500 border-2  px-10 py-1.5 rounded-lg  hover:bg-indigo-500 hover:text-white transition-all ease-linear shadow-md"
                    >
                        {isLoading ? <Spinner /> : "Save"}
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
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="mb-4 flex-1">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="title"
                        >
                            Username
                        </label>
                        <input
                            className="shadow appearance-none border-2 border-slate-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            type="text"
                            value={data?.title}
                            onChange={(e) =>
                                setData("username", e.target.value)
                            }
                            placeholder="Username"
                        />
                    </div>
                    <div className="text-xs text-slate-400 px-5">OR</div>

                    <div className="mb-4 flex-1">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="title"
                        >
                            Coupon
                        </label>
                        <input
                            className="shadow appearance-none border-2 border-slate-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="title"
                            type="text"
                            value={data?.coupon}
                            onChange={(e) => setData("coupon", e.target.value)}
                            placeholder="Coupon Code"
                        />
                    </div>
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex gap-4 md:gap-10">
                        <div className="mb-4 flex-1 ">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="status"
                            >
                                Status
                            </label>

                            <Select
                                // label="Favorite Animal"
                                labelPlacement="outside"
                                name="Status"
                                placeholder="Lead Status"
                                className="relative overflow-visible rounded-xs w-96 bg-background/0 "
                                onChange={handleStatusChange}
                                defaultSelectedKeys={[data?.role]}
                                id="roles"
                            >
                                {statuses.map((status) => (
                                    <SelectItem
                                        key={status}
                                        className="bg-red"
                                        value={status}
                                    >
                                        {status}
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default LeadForm;
