import { Link, usePage } from "@inertiajs/react";

import { admin, affiliate } from "./LinksIcons";
import { Suspense, lazy } from "react";

const NavItem = lazy(() => import("./NavItem"));

const NavLinks = () => {
    const { props, url } = usePage();

    const userType = props?.auth?.user?.role;

    const linksLabel = userType === "admin" ? admin : affiliate;

    return (
        <ul className="mt-10 mr-5">
            {linksLabel.map((link) => (
                <li key={link?.label}>
                    <Suspense
                        fallback={
                            <span className="py-7 px-3 animate-pulse rounded-r-md bg-[#F6F9FC] w-full inline-block"></span>
                        }
                    >
                        <NavItem
                            href={`${link?.href}`}
                            label={link?.label}
                            Icon={link?.Icon}
                            isActive={url?.includes(link?.active)}
                        />
                    </Suspense>
                </li>
            ))}
        </ul>
    );
};

export default NavLinks;
