import { Link, usePage } from "@inertiajs/react";
import React from "react";
import NavLinks from "@/Components/SideBare/NavLinks";

const SideBar = () => {
    const {
        props: {
            info: { telegram, logoText, logoImage },
        },
    } = usePage();

    return (
        <div className=" min-w-52 h-screen bg-white pt-5 fixed top-0 box-border w-60  ">
            <div className="flex flex-col justify-between h-full">
                <div>
                    <div className=" flex justify-center ">
                        <Link href={route("home")}>
                            {logoImage ? (
                                <span className="">
                                    <img
                                        className=" h-16"
                                        src={`/${logoImage}`}
                                        alt={logoText}
                                    />
                                </span>
                            ) : (
                                <span className=" font-bold text-3xl">
                                    {logoText ? logoText : "AffiliateES"}
                                </span>
                            )}
                        </Link>
                    </div>
                    <nav>
                        <NavLinks />
                    </nav>
                </div>
                <div className="relative bottom-5 flex justify-center">
                    <a
                        target={telegram.includes("http") ? "_blank" : ""}
                        href={telegram ? telegram : "#"}
                        className="flex items-center  gap-2 bg-telegram text-white py-1.5 px-3 rounded-full"
                    >
                        <span>
                            <img
                                src="/icons/Telegram_logo.webp"
                                alt="telegram log"
                                className="w-8 h-8"
                            />
                        </span>
                        <span className=" font-gotham font-light">
                            Telegram Support
                        </span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default SideBar;
