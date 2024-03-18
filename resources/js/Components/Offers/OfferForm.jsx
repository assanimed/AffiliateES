import { useForm } from "@inertiajs/react";
import { Divider } from "@nextui-org/react";
import React, { useEffect } from "react";
import Assets from "./Assets";
import { useSelector } from "react-redux";

const OfferhtmlForm = () => {
    const assets = useSelector((state) => state?.offer?.assets);

    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        description: "",
        assets: [],
    });
    const submit = (e) => {
        e.preventDefault();

        if (!assets.length) return;

        post(route("offers.store"));
    };

    useEffect(() => {
        setData("assets", assets);
    }, [assets]);

    return (
        <div>
            <form onSubmit={submit} className="w-full bg-white px-5 py-3">
                <div className="px-5 sm:flex-row flex-col gap-2 flex  items-center justify-between py-2  font-bold">
                    <h3 className="text-xl">Agregar nueva oferta</h3>
                    <button
                        // disabled={processing}
                        type="submit"
                        // onClick={() => }
                        className=" disabled:cursor-not-allowed disabled:bg-indigo-300 disabled:hover:text-indigo-500 disabled:hover:bg-indigo-300  text-indigo-500 border-indigo-500 border-2  px-10 py-1.5 rounded-lg  hover:bg-indigo-500 hover:text-white transition-all ease-linear shadow-md"
                    >
                        Guardar
                    </button>
                </div>

                <Divider
                    my="md"
                    className="bg-slate-300 h-[2px] mb-10 rounded-full"
                />
                <div className="flex flex-col gap-4">
                    <div className="mb-4 flex-1">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="title"
                        >
                            Título
                        </label>
                        <input
                            className="shadow appearance-none border-2 border-slate-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="title"
                            type="text"
                            required
                            value={data?.title}
                            onChange={(e) => setData("title", e.target.value)}
                            placeholder="Título de la oferta"
                        />
                    </div>
                    <div className="mb-4 flex-1">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="description"
                        >
                            Descripción
                        </label>
                        <textarea
                            className="shadow appearance-none border-2 border-slate-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            name="description"
                            id="description"
                            cols="30"
                            rows="10"
                            required
                            value={data?.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                        ></textarea>
                    </div>

                    <div className="mb-4 flex-1">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="others"
                        >
                            Recursos
                        </label>
                        <Assets />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default OfferhtmlForm;
