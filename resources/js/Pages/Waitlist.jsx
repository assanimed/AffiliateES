import React from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import AnimatedCheckIcon from "@/Components/AnimatedCheckIcon.jsx";
import { Head, Link, useForm } from "@inertiajs/react";
import { Button } from "@nextui-org/react";
import { HiLogout } from "react-icons/hi";

const Waitlist = () => {
    return (
        <>
            <GuestLayout>
                <Head title="waitlist" />
                <div className="bg-white px-6 py-6  sm:rounded-lg">
                    <h1 className="my-2 text-2xl font-bold text-center uppercase">
                        GRACIAS POR UNIRTE A NOSOTROS
                    </h1>

                    <div className="my-10">
                        <div className="max-w-[100px] mx-auto">
                            <AnimatedCheckIcon />
                        </div>
                    </div>

                    <div className="text-center font-bold mt-5">
                        <span>
                            We've received your application. Our team will
                            contact you soon about approval. You can also to us
                            if you have any questions. Hemos recibido su
                            solicitud. Nuestro equipo se comunicará con usted
                            pronto para obtener la aprobación. También puede{" "}
                            comunicarse con nosotros si tiene alguna pregunta.
                        </span>
                    </div>

                    <div className="flex justify-center mt-10">
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="flex items-center gap-2 bg-indigo-500 text-white px-5 py-2 rounded"
                        >
                            <span>Cerrar sesión</span>
                            <HiLogout />
                        </Link>
                    </div>
                </div>
            </GuestLayout>
        </>
    );
};

export default Waitlist;
