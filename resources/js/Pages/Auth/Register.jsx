import { useEffect, useState } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import { LuUser } from "react-icons/lu";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { Checkbox } from "@nextui-org/react";
import checkPasswordStrength from "@/utisl/checkPasswordStrenth";

export default function Register() {
    const [pwdStrength, setPwdStrength] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        username: "",
        password: "",
        email: "",
        password_confirmation: "",
        privacy_policy: false,
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    useEffect(() => {
        if (data?.password) {
            setPwdStrength(checkPasswordStrength(data?.password));
        }

        if (data?.password === "") setPwdStrength(null);
    }, [data?.password]);

    const submit = (e) => {
        e.preventDefault();

        post(route("register"));
    };

    return (
        <GuestLayout>
            <Head title="Register" />
            <div className="bg-white px-6 py-6  sm:rounded-lg">
                <h1 className="text-center font-bold text-2xl text-[#172B4D] mb-2">
                    AFFILIATE SING UP
                </h1>
                <h3 className="text-center text-sm text-[#172B4D] mb-2">
                    Hey there! Let's get started.
                </h3>
                <form onSubmit={submit}>
                    <div className="flex flex-col gap-4 mt-10">
                        <div>
                            <TextInput
                                id="name"
                                name="name"
                                label="Name"
                                Icon={
                                    <LuUser className="text-2xl text-gray-500" />
                                }
                                value={data.name}
                                className="mt-1 block w-full"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                required
                            />

                            <InputError
                                message={errors.name}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <TextInput
                                id="username"
                                type="text"
                                name="username"
                                Icon={
                                    <MdOutlineMailOutline className="text-2xl text-gray-500" />
                                }
                                label="Username"
                                value={data.username}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                onChange={(e) =>
                                    setData("username", e.target.value)
                                }
                                required
                            />

                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>
                        <div className="mt-4">
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                Icon={
                                    <MdOutlineMailOutline className="text-2xl text-gray-500" />
                                }
                                label="E-mail"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="email"
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                required
                            />

                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-2">
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                label="Password"
                                Icon={
                                    <RiLockPasswordLine className="text-2xl text-gray-500" />
                                }
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                required
                            />
                            {pwdStrength && (
                                <span className="text-sm mt-2 inline-block">
                                    Password Strength:{" "}
                                    <span className="text-[#2DCEAA] font-bold">
                                        {pwdStrength}
                                    </span>
                                </span>
                            )}
                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>
                        <div className="mt-2">
                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                label="Password Confimation"
                                Icon={
                                    <RiLockPasswordLine className="text-2xl text-gray-500" />
                                }
                                value={data.password_confirmation}
                                className="mt-1 block w-full"
                                autoComplete="password_confiamtion"
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value
                                    )
                                }
                                required
                            />

                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>
                    </div>

                    <div className="mb-3 mt-4">
                        <Checkbox
                            isSelected={data?.privacy_policy}
                            onValueChange={(checked) =>
                                setData("privacy_policy", checked)
                            }
                        >
                            I agree with{" "}
                            <Link
                                className="text-blue-600"
                                href="/privacy-policy"
                            >
                                Privacy Policy
                            </Link>
                        </Checkbox>
                        <InputError
                            message={errors.privacy_policy}
                            className="mt-2"
                        />
                        {/* <input type="checkbox" id="policy"/>
                        <label htmlFor="policy">I agree with <Link href="/privacy-policy">Privacy Policy</Link></label> */}
                    </div>
                    <div>
                        <Link
                            href={route("login")}
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Already registered?
                        </Link>
                    </div>

                    {/* <div className="flex items-center justify-end mt-4">
                    <Link
                        href={route("login")}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div> */}
                    <div className="flex justify-center mt-5 mb-2">
                        <button
                            disabled={processing}
                            className="bg-indigo-500 text-white px-20 py-2 rounded-md"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
