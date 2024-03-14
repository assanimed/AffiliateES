import "../../../css/formEdit.css";

import React, { useEffect, useState } from "react";

import { TextInput } from "@mantine/core";
import { Divider, Select, SelectItem, Spinner } from "@nextui-org/react";
import { useGetAllCountriesQuery } from "@/redux/services/countriesApi";
import { useForm, usePage } from "@inertiajs/react";
import { useUpdateUserMutation } from "@/redux/services/usersApi";

const UpdateForm = ({ user }) => {
    const [showRole, setShowRole] = useState(false);

    const { props: flash } = usePage();

    const Statuses = ["approved", "pending", "banned"];
    const roles = ["affiliate", "admin"];

    const [countries, setCountries] = useState([]);
    const [showNot, setShowNot] = useState(false);
    const [showErr, setShowErr] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: user?.name,
        username: user?.username,
        email: user?.email,
        phone_number: user?.profile?.phone_number,
        status: user?.affiliate?.status,
        coupon: user?.affiliate?.coupon,
        address: user?.profile?.address,
        country: user?.profile?.country,
        city: user?.profile?.city,
        links: user?.links,
    });

    const {
        data: countriesData,
        isLoading,
        isError,
        isSuccess,
    } = useGetAllCountriesQuery();

    const [
        updateUser,
        {
            data: updateData,
            isLoading: isUpdateLoading,
            isError: isUpdateError,
            isSuccess: isUpdateSuccess,
        },
    ] = useUpdateUserMutation();

    const submit = (e) => {
        e.preventDefault();

        let info = {};

        for (let [key, value] of Object.entries(data)) {
            if (value) {
                info[key] = value;
            }
        }

        let links = {};
        if (user?.role === "affiliate") {
            for (let [key, value] of Object.entries(data?.links)) {
                if (
                    value &&
                    ["facebook", "instagram", "tiktok", "others"].includes(key)
                ) {
                    links[key] = value;
                }
            }
        }

        info["links"] = links;

        updateUser(info);
    };

    const handleStatusChange = (e) => setData("status", e.target.value);
    const handleCountryChange = (e) => setData("country", e.target.value);

    useEffect(() => {
        if (isSuccess) {
            setCountries(countriesData);
        }
    }, [isSuccess, countriesData]);

    useEffect(() => {
        if (isUpdateSuccess) {
            setShowNot(true);
            setTimeout(() => setShowNot(false), 8000);
        }

        if (isUpdateError) {
            setShowErr(true);
            setTimeout(() => setShowErr(false), 8000);
        }
    }, [isUpdateSuccess, isUpdateError]);

    return (
        <div>
            {showNot ? (
                <div className="bg-indigo-500 py-3 px-2 rounded text-white">
                    Usuario actualizado exitosamente
                </div>
            ) : (
                ""
            )}

            {showErr ? (
                <div className="bg-red-500 py-3 px-2 rounded text-white">
                    Error al actualizar la información
                </div>
            ) : (
                ""
            )}
            <form onSubmit={submit} className="w-full bg-white px-5 py-3">
                <div className="px-5 flex items-center justify-end py-2  font-bold">
                    <button
                        // onClick={submit}
                        disabled={isUpdateLoading}
                        className=" disabled:cursor-not-allowed disabled:bg-indigo-300 disabled:hover:text-indigo-500 disabled:hover:bg-indigo-300  text-indigo-500 border-indigo-500 border-2  px-10 py-1.5 rounded-lg  hover:bg-indigo-500 hover:text-white transition-all ease-linear shadow-md"
                    >
                        {isUpdateLoading ? <Spinner size="sm" /> : "Guardar"}
                    </button>
                </div>

                <Divider
                    my="md"
                    className="bg-slate-300 h-[2px] rounded-full"
                />
                <h2 className="text-xl my-2">Información Básica</h2>
                <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 md:gap-10">
                    <div className="mb-4 flex-1">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            for="name"
                        >
                            Nombre
                        </label>
                        <input
                            className="shadow appearance-none border-2 border-slate-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            type="text"
                            value={data?.name}
                            onChange={(e) => setData("name", e.target.value)}
                            placeholder="Nombre"
                        />
                    </div>
                    <div className="mb-4 flex-1">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            for="username"
                        >
                            Nombre de Usuario
                        </label>
                        <input
                            className="shadow appearance-none border border-2 border-slate-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            type="text"
                            value={data?.username}
                            onChange={(e) =>
                                setData("username", e.target.value)
                            }
                            placeholder="Nombre de Usuario"
                        />
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 md:gap-10">
                    <div className="mb-4 flex-1">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            for="email"
                        >
                            Correo Electrónico
                        </label>
                        <input
                            className="shadow appearance-none border-2 border-slate-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="text"
                            value={data?.email}
                            placeholder="Correo Electrónico"
                            onChange={(e) => setData("email", e.target.value)}
                        />
                    </div>
                    <div className="mb-4 flex-1">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            for="phone"
                        >
                            Número de Teléfono
                        </label>
                        <input
                            className="shadow appearance-none border border-2 border-slate-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="phone"
                            type="text"
                            value={data?.phone_number}
                            placeholder="Número de Teléfono"
                            onChange={(e) =>
                                setData("phone_number", e.target.value)
                            }
                        />
                    </div>
                </div>
                {user?.role === "affiliate" ? (
                    <>
                        <hr />
                        <h2 className="text-xl my-2">
                            Información de Facturación / Perfil
                        </h2>
                        <div className="flex gap-4 md:gap-10">
                            <div className="mb-4 flex-1">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    for="address"
                                >
                                    Dirección
                                </label>
                                <input
                                    className="shadow appearance-none border-2 border-slate-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="address"
                                    type="text"
                                    value={data?.address}
                                    placeholder="Address"
                                    onChange={(e) =>
                                        setData("address", e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 md:gap-10">
                            <div className="mb-4 flex-1">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    for="country"
                                >
                                    País
                                </label>
                                <Select
                                    items={countries}
                                    id="country"
                                    placeholder="País"
                                    labelPlacement="outside"
                                    onChange={handleCountryChange}
                                    defaultSelectedKeys={
                                        data?.country ? [data?.country] : null
                                    }
                                >
                                    {(country) => (
                                        <SelectItem
                                            key={country?.name?.common}
                                            textValue={country?.name?.common}
                                        >
                                            <div className="flex gap-2 items-center">
                                                <div className="flex flex-col">
                                                    <span className="text-small">
                                                        {country?.name?.common}
                                                    </span>
                                                </div>
                                            </div>
                                        </SelectItem>
                                    )}
                                </Select>
                            </div>
                            <div className="mb-4 flex-1">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    for="city"
                                >
                                    Ciudad
                                </label>
                                <input
                                    className="shadow appearance-none border-2 border-slate-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="city"
                                    type="text"
                                    value={data?.city}
                                    placeholder="Ciudad"
                                    onChange={(e) =>
                                        setData("city", e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <hr />

                        <h2 className="text-xl my-2">Enlaces Externos</h2>
                        <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 md:gap-10">
                            <div className="mb-4 flex-1">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    for="instagram"
                                >
                                    URL de Instagram
                                </label>
                                <input
                                    className="shadow appearance-none border-2 border-slate-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="instagram"
                                    type="text"
                                    value={data?.links?.instagram}
                                    placeholder="nombre de usuario de insta"
                                    onChange={(e) =>
                                        setData("links", {
                                            ...data?.links,
                                            instagram: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="mb-4 flex-1">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    for="tiktok"
                                >
                                    TikTok
                                </label>
                                <input
                                    className="shadow appearance-none  border-2 border-slate-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="toktok"
                                    type="text"
                                    value={data?.links?.tiktok}
                                    placeholder="Nombre de usuario de TikTok"
                                    onChange={(e) =>
                                        setData("links", {
                                            ...data?.links,
                                            tiktok: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>
                        <div className="flex gap-4 md:gap-10">
                            <div className="mb-4 flex-1">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    for="facebook"
                                >
                                    Página de Facebook
                                </label>
                                <input
                                    className="shadow appearance-none  border-2 border-slate-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="facebook"
                                    type="text"
                                    value={data?.links?.facebook}
                                    placeholder="página de facebook"
                                    onChange={(e) =>
                                        setData("links", {
                                            ...data?.links,
                                            facebook: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>

                        <div className="flex gap-4 md:gap-10">
                            <div className="mb-4 flex-1">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    for="others"
                                >
                                    Otros, si los Hay
                                </label>
                                <textarea
                                    className="shadow appearance-none border-2 border-slate-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    name="others"
                                    id="others"
                                    cols="30"
                                    rows="10"
                                    value={data?.links?.others}
                                    onChange={(e) =>
                                        setData("links", {
                                            ...data?.links,
                                            others: e.target.value,
                                        })
                                    }
                                ></textarea>
                            </div>
                        </div>
                    </>
                ) : (
                    ""
                )}
            </form>
        </div>
    );
};

export default UpdateForm;
