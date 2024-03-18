import {
    useCreateLeadMutation,
    useUpdateLeadMutation,
} from "@/redux/services/leadApi/leadApi";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Divider, Select, SelectItem, Spinner } from "@nextui-org/react";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const UpdateForm = () => {
    const backLink = useRef();

    const {
        props: { lead: givenLead },
    } = usePage();
    // const assets = useSelector((state) => state?.offer?.assets);

    const statuses = ["shipped", "pending"];
    const esStatus = {
        shipped: "Enviado",
        pending: "Pendiente",
    };
    const handleStatusChange = (e) => setData("status", e.target.value);

    const { data, setData } = useForm({
        status: givenLead?.status,
        id: givenLead?.id,
    });

    const [updateLead, { error, data: lead, isLoading, isError, isSuccess }] =
        useUpdateLeadMutation();

    const submit = (e) => {
        e.preventDefault();
        updateLead(data);
    };

    if (isSuccess) {
        backLink.current.click();
    }

    return (
        <div>
            <form onSubmit={submit} className="w-full bg-white px-5 py-3">
                <Link className="w-0 h-0" ref={backLink} href="/leads"></Link>
                <div className="px-5 flex  items-center sm:flex-row flex-col gap-2 justify-between py-2  font-bold">
                    <h3 className="text-xl">
                        ID Lead #{" "}
                        <span className=" inline-block px-2 py-1 text-white bg-indigo-500 rounded-md">
                            {givenLead?.id}
                        </span>
                    </h3>
                    <button
                        // disabled={processing}
                        type="submit"
                        // onClick={() => }
                        className=" disabled:cursor-not-allowed disabled:bg-indigo-300 disabled:hover:text-indigo-500 disabled:hover:bg-indigo-300  text-indigo-500 border-indigo-500 border-2  px-10 py-1.5 rounded-lg  hover:bg-indigo-500 hover:text-white transition-all ease-linear shadow-md"
                    >
                        {isLoading ? <Spinner /> : "Guardar"}
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
                    <div className="flex gap-4 md:gap-10">
                        <div className="mb-4 flex-1 ">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="status"
                            >
                                Nuevo estado
                            </label>

                            <Select
                                // label="Favorite Animal"
                                labelPlacement="outside"
                                name="Status"
                                placeholder="Estado del cliente potencial"
                                className="relative overflow-visible rounded-xs w-full md:w-96 bg-background/0 "
                                onChange={handleStatusChange}
                                defaultSelectedKeys={[data?.status]}
                                id="roles"
                            >
                                {statuses.map((status) => (
                                    <SelectItem
                                        key={status}
                                        className="bg-red"
                                        value={status}
                                    >
                                        {esStatus[status]}
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

export default UpdateForm;
