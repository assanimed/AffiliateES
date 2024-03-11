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
                    User Updated Successfully
                </div>
            ) : (
                ""
            )}

            {showErr ? (
                <div className="bg-red-500 py-3 px-2 rounded text-white">
                    Failed to Update Information
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
                        {isUpdateLoading ? <Spinner size="sm" /> : "Save"}
                    </button>
                </div>

                <Divider
                    my="md"
                    className="bg-slate-300 h-[2px] rounded-full"
                />
                <h2 className="text-xl my-2">Basic Info</h2>
                <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 md:gap-10">
                    <div className="mb-4 flex-1">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            for="username"
                        >
                            Name
                        </label>
                        <input
                            className="shadow appearance-none border-2 border-slate-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            type="text"
                            value={data?.name}
                            onChange={(e) => setData("name", e.target.value)}
                            placeholder="Full Name"
                        />
                    </div>
                    <div className="mb-4 flex-1">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            for="username"
                        >
                            Username
                        </label>
                        <input
                            className="shadow appearance-none border border-2 border-slate-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            type="text"
                            value={data?.username}
                            onChange={(e) =>
                                setData("username", e.target.value)
                            }
                            placeholder="Username"
                        />
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 md:gap-10">
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
                            Phone Number
                        </label>
                        <input
                            className="shadow appearance-none border border-2 border-slate-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="phone"
                            type="text"
                            value={data?.phone_number}
                            placeholder="Phone Number"
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
                            Billing Information / Profile
                        </h2>
                        <div className="flex gap-4 md:gap-10">
                            <div className="mb-4 flex-1">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    for="address"
                                >
                                    Address
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
                                    Country
                                </label>
                                <Select
                                    items={countries}
                                    id="country"
                                    placeholder="Your Country"
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
                                    City
                                </label>
                                <input
                                    className="shadow appearance-none border border-2 border-slate-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="city"
                                    type="text"
                                    value={data?.city}
                                    placeholder="City"
                                    onChange={(e) =>
                                        setData("city", e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <hr />

                        <h2 className="text-xl my-2">External Links</h2>
                        <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 md:gap-10">
                            <div className="mb-4 flex-1">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    for="instagram"
                                >
                                    Instagram URL
                                </label>
                                <input
                                    className="shadow appearance-none border-2 border-slate-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="instagram"
                                    type="text"
                                    value={data?.links?.instagram}
                                    placeholder="insta username"
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
                                    placeholder="TikTok username"
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
                                    Facebook Page
                                </label>
                                <input
                                    className="shadow appearance-none  border-2 border-slate-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="facebook"
                                    type="text"
                                    value={data?.links?.facebook}
                                    placeholder="facebook page"
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
                                    Others if Any
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
