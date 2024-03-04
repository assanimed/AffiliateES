import { useEffect } from "react";
import { Checkbox } from "@nextui-org/react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        username: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />
            <>
                <div className="bg-white px-6 py-6  sm:rounded-lg">
                    <h1 className="text-center font-bold text-2xl text-[#172B4D] mb-2">
                        AFFILIATE LOGIN
                    </h1>
                    <h3 className="text-center text-sm text-[#172B4D] mb-2">
                        Welcome back! Please login to continue.
                    </h3>
                    <form onSubmit={submit}>
                        <div className="flex flex-col gap-4 mt-10">
                            <div className="mt-4">
                                <TextInput
                                    id="username"
                                    type="text"
                                    name="username"
                                    Icon={
                                        <MdOutlineMailOutline className="text-2xl text-gray-500" />
                                    }
                                    label="Username or email"
                                    value={data.username}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    onChange={(e) =>
                                        setData("username", e.target.value)
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.username}
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
                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </div>
                        </div>

                        <div className="mb-3 mt-6">
                            <Checkbox
                                isSelected={data?.remember}
                                onValueChange={(checked) =>
                                    setData("remember", checked)
                                }
                            >
                                Remember me
                            </Checkbox>
                        </div>

                        <div className="flex justify-center mt-10 mb-2">
                            <button
                                disabled={processing}
                                className="bg-indigo-500 text-white px-20 py-2 rounded-md"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
                <div className="flex my-5 justify-center text-white">
                    <span>
                        New to Product?{" "}
                        <Link
                            href="/register"
                            className="text-indigo-400 font-bold"
                        >
                            Sign Up
                        </Link>
                    </span>
                </div>
            </>
        </GuestLayout>
    );
}
