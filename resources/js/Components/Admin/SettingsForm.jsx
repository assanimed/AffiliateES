import { useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import LogoPlace from "./LogoPlace";
import { useUpdateSettingsMutation } from "@/redux/services/settingsApi/settingsApi";
import { Spinner } from "@nextui-org/react";

const SettingsForm = ({ settingsData: dataSettings }) => {
    const imageVal = dataSettings?.find((el) => el.key === "logoImage")?.value;
    const { data, setData } = useForm({
        commission: parseInt(
            dataSettings?.find((el) => el.key === "commission")?.value
        ),
        logoText: dataSettings?.find((el) => el.key === "logoText")?.value,
        logoImage: imageVal ? imageVal : null,
        logoFile: null,
    });

    const [
        updateSetting,
        { data: settingsData, isLoading, isError, isSuccess },
    ] = useUpdateSettingsMutation();

    const handleSubmit = (e) => {
        // e.preventDefaul();

        const formData = new FormData();

        if (parseInt(data?.commission) > 0) {
            formData.append("commission", data?.commission);
        }

        if (data?.logoText?.length > 0) {
            formData.append("logoText", data?.logoText);
        }

        if (data?.logoFile) {
            formData.append("logoFile", data?.logoFile);
        }

        updateSetting(formData);
    };

    const [showInfo, setShowInfo] = useState(false);

    useEffect(() => {
        if (isSuccess || isError) {
            setShowInfo(true);
            setTimeout(() => setShowInfo(false), 5000);
        }
    }, [isSuccess, isError]);

    return (
        <div>
            <form onSubmit={handleSubmit} className="w-full bg-white px-5 py-3">
                {isError && showInfo && (
                    <div className="bg-red-500 text-white px-2 py-1 rounded">
                        Failed to Update Setting Please Try Later
                    </div>
                )}

                {isSuccess && showInfo && (
                    <div className="bg-indigo-500 text-white px-2 py-1 rounded">
                        Settings Updated Successfully
                    </div>
                )}
                <div className="px-5 flex  items-center justify-between py-2  font-bold">
                    <h3 className="text-xl"></h3>
                    <button
                        // disabled={processing}
                        type="button"
                        onClick={handleSubmit}
                        className=" disabled:cursor-not-allowed disabled:bg-indigo-300 disabled:hover:text-indigo-500 disabled:hover:bg-indigo-300  text-indigo-500 border-indigo-500 border-2  px-10 py-1.5 rounded-lg  hover:bg-indigo-500 hover:text-white transition-all ease-linear shadow-md"
                    >
                        <span>{isLoading ? <Spinner /> : "Save"}</span>
                    </button>
                </div>
                <h2 className="text-xl my-2">Logo</h2>
                <div className="flex flex-col md:flex-row gap-4 md:gap-10">
                    <div className="mb-4 flex-1">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            for="logoImage"
                        >
                            Logo Image
                        </label>
                        <LogoPlace
                            file={data?.logoFile}
                            image={data?.logoImage}
                            setData={setData}
                        />
                    </div>
                    <div className="mb-4 flex-1">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            for="logoText"
                        >
                            Alternative Text Logo
                        </label>
                        <input
                            className="shadow appearance-none  border-2 border-slate-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="logoText"
                            type="text"
                            value={data?.logoText}
                            onChange={(e) =>
                                setData("logoText", e.target.value)
                            }
                            placeholder="logoText"
                        />
                    </div>
                </div>
                <hr />
                <h2 className="text-xl my-2">Commission</h2>
                <div className="flex gap-4 md:gap-10">
                    <div className="mb-4 flex-1 max-w-56">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            for="username"
                        >
                            Commission value
                        </label>
                        <input
                            className="shadow appearance-none border-2 border-slate-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            type="text"
                            value={data?.commission}
                            onChange={(e) =>
                                setData("commission", e.target.value)
                            }
                            placeholder="Full Name"
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SettingsForm;
