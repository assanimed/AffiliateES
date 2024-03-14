import "../../../css/formEdit.css";

import React, { useEffect, useState } from "react";

import { TextInput } from "@mantine/core";
import { Divider, Select, SelectItem } from "@nextui-org/react";
import { useGetAllCountriesQuery } from "@/redux/services/countriesApi";
import { useForm, usePage } from "@inertiajs/react";

const EditForm = ({ user }) => {
    const [showRole, setShowRole] = useState(false);

    const { props: flash } = usePage();

    const Statuses = ["approved", "pending", "banned"];
    const esStatus = {
        approved: "Aprobado",
        pending: "Pendiente",
        banned: "Bloqueado",
    };
    const roles = ["affiliate", "admin"];
    const rolesEs = {
        affiliate: "afiliado",
        admin: "administración",
    };

    const [countries, setCountries] = useState([]);
    const [showNot, setShowNot] = useState(false);

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
        role: user?.role,
    });

    const {
        data: countriesData,
        isLoading,
        isError,
        isSuccess,
    } = useGetAllCountriesQuery();

    const submit = (e) => {
        e.preventDefault();

        // console.log("User", data);
        post(route("user.edit", { user: user?.id }), {
            onSuccess: () => {
                reset();
                Inertia.reload({
                    only: [], // Reload with fresh props
                    preserveState: false, // Optionally preserve state
                });
            },
        });
    };

    const handleStatusChange = (e) => setData("status", e.target.value);
    const handleRoleChange = (e) => setData("role", e.target.value);
    const handleCountryChange = (e) => setData("country", e.target.value);

    useEffect(() => {
        console.log("countriesData", countriesData);
        if (isSuccess) {
            setCountries(countriesData);
        }
    }, [isSuccess, countriesData]);

    return (
        <div>
            {showNot && (
                <div className="bg-red-300 py-3 px-2 rounded text-white">
                    Usuario actualizado con éxito
                </div>
            )}
            <form onSubmit={submit} className="w-full bg-white px-5 py-3">
                <div className="px-5 flex items-center justify-between py-2  font-bold">
                    <h3 className="text-xl">Editar usuario</h3>
                    <button
                        disabled={processing}
                        className=" disabled:cursor-not-allowed disabled:bg-indigo-300 disabled:hover:text-indigo-500 disabled:hover:bg-indigo-300  text-indigo-500 border-indigo-500 border-2  px-10 py-1.5 rounded-lg  hover:bg-indigo-500 hover:text-white transition-all ease-linear shadow-md"
                    >
                        Guardar
                    </button>
                </div>

                <Divider
                    my="md"
                    className="bg-slate-300 h-[2px] rounded-full"
                />
                <h2 className="text-xl my-2">Información básica</h2>
                <div className="flex gap-4 md:gap-10">
                    <div className="mb-4 flex-1">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            for="username"
                        >
                            Nombre
                        </label>
                        <input
                            className="shadow appearance-none border-2 border-slate-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            type="text"
                            value={data?.name}
                            onChange={(e) => setData("name", e.target.value)}
                            placeholder="Nombre completo"
                        />
                    </div>
                    <div className="mb-4 flex-1">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            for="username"
                        >
                            Nombre de usuario
                        </label>
                        <input
                            className="shadow appearance-none border-2 border-slate-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            type="text"
                            value={data?.username}
                            onChange={(e) =>
                                setData("username", e.target.value)
                            }
                            placeholder="Nombre de usuario"
                        />
                    </div>
                </div>
                <div className="flex gap-4 md:gap-10">
                    <div className="mb-4 flex-1">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            for="email"
                        >
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border border-2 border-slate-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="text"
                            value={data?.email}
                            placeholder="Email"
                            onChange={(e) => setData("email", e.target.value)}
                        />
                    </div>
                    <div className="mb-4 flex-1">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            for="email"
                        >
                            Número de teléfono
                        </label>
                        <input
                            className="shadow appearance-none border border-2 border-slate-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="phone"
                            type="text"
                            value={data?.phone_number}
                            placeholder="Número de teléfono"
                            onChange={(e) =>
                                setData("phone_number", e.target.value)
                            }
                        />
                    </div>
                </div>

                <hr />
                <h2 className="text-xl my-2">Estado de Afiliado</h2>
                <div className="flex gap-4 md:gap-10">
                    <div className="mb-4 flex-1">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            for="status"
                        >
                            Estado
                        </label>

                        <Select
                            // label="Favorite Animal"
                            labelPlacement="outside"
                            placeholder="Estado"
                            className="relative overflow-visible rounded-xs bg-background/0 "
                            onChange={handleStatusChange}
                            defaultSelectedKeys={[data?.status]}
                            id="status"
                            name="status"
                        >
                            {Statuses.map((status) => (
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
                    <div className="mb-4 flex-1">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            for="coupon"
                        >
                            Código de cupón
                        </label>
                        <input
                            className="shadow appearance-none border border-2 border-slate-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="Coupon"
                            type="text"
                            value={data?.coupon}
                            placeholder="Código de cupón"
                            onChange={(e) => setData("coupon", e.target.value)}
                        />
                    </div>
                </div>
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
                            placeholder="Dirección"
                            onChange={(e) => setData("address", e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex gap-4 md:gap-10">
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
                            defaultSelectedKeys={[data?.country]}
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
                            className="shadow appearance-none border border-2 border-slate-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="city"
                            type="text"
                            value={data?.city}
                            placeholder="Ciudad"
                            onChange={(e) => setData("city", e.target.value)}
                        />
                    </div>
                </div>

                <hr />

                <h2 className="text-xl my-2">Enlaces Externos</h2>
                <div className="flex gap-4 md:gap-10">
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

                <hr />
                <h2
                    className="text-xl my-2 cursor-pointer mt-5"
                    os="button"
                    onClick={() => setShowRole(!showRole)}
                >
                    Cambiar Rol
                </h2>
                {showRole && (
                    <div className="flex gap-4 md:gap-10">
                        <div className="mb-4 flex-1 ">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                for="role"
                            >
                                rol
                            </label>

                            <Select
                                // label="Favorite Animal"
                                labelPlacement="outside"
                                name="role"
                                placeholder="rol"
                                className="relative overflow-visible rounded-xs bg-background/0 "
                                onChange={handleRoleChange}
                                defaultSelectedKeys={[data?.role]}
                                id="roles"
                            >
                                {roles.map((role) => (
                                    <SelectItem
                                        key={role}
                                        className="bg-red"
                                        value={role}
                                    >
                                        {rolesEs[role]}
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
};

export default EditForm;
