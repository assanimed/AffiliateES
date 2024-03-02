import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";

export default function Guest({ children }) {
    return (
        <div className="max-w-[100vw] min-h-[100vh] overflow-y-hidden flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-[#11CDEF]">
            <div className="bg-[#172B4D] w-[200vw] h-[1000px] top-[300px] -rotate-6	 fixed" />

            <div className=" w-full min-h-scree min-w-screen absolute top-10 sm:max-w-lg mt-6 px-6 py-4 overflow-y-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
