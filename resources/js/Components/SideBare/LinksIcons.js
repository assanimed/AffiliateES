import { BiHomeAlt, BiSolidOffer } from "react-icons/bi";
import { CiSettings } from "react-icons/ci";
import { IoMagnetOutline } from "react-icons/io5";
import { HiOutlineUsers } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";

const HOME = {
    active: "/dashboard",
    label: "Home",
    Icon: BiHomeAlt,
    href: "/",
};
const OFFERS = {
    active: "/offers",
    label: "Offers",
    Icon: BiSolidOffer,
    href: "/offers",
};
const LEADS = {
    active: "/leads",
    label: "Leads",
    Icon: IoMagnetOutline,
    href: "/leads",
};
const USERS = {
    active: "/users",
    label: "Users",
    Icon: HiOutlineUsers,
    href: "/users",
};
const SETTINGS = {
    active: "/settings",
    label: "Settings",
    Icon: IoSettingsOutline,
    href: "/settings",
};

export const admin = [HOME, OFFERS, LEADS, USERS, SETTINGS];
export const affiliate = [HOME, OFFERS, LEADS, SETTINGS];
