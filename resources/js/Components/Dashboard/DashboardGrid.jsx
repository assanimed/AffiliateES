import React from "react";
import GridItem from "./GridItem";
import LineUp from "./LineUp";
import LineDown from "./LineDown";
import DollarIcon from "./DollarIcon";
import { usePage } from "@inertiajs/react";
import StableIcon from "./StableIcon";

const DashboardGrid = () => {
    const {
        props: {
            data: { users, leads, notShipped, payouts },
        },
    } = usePage();

    const calDiff = (item) => {
        if (item?.data?.lastMonth === item?.data?.currentMonth) return 0;

        if (item?.data?.lastMonth === 0) return 100;

        return (item?.data?.currentMonth * 100) / item?.data?.lastMonth - 100;
    };

    const GrisItems = [
        {
            key: "leads",
            data: leads,
            text: "TOTAL LEADS",
        },
        {
            key: "notShipped",
            data: notShipped,
            text: "NOT SHIPPED",
        },
        {
            key: "payouts",
            data: payouts,
            text: "PAYOUTS",
        },
        {
            key: "users",
            data: users,
            text: "TOTAL USERS",
        },
    ];

    const switchIcon = (state) => {
        switch (state) {
            case "up":
                return (
                    <div className="bg-green-400 rounded-full p-2	">
                        <LineUp className=" w-9" />
                    </div>
                );

            case "down":
                return (
                    <div className="bg-red-500 rounded-full p-2	">
                        <LineDown className=" w-9" />
                    </div>
                );

            case "dollar":
                return (
                    <div className="bg-indigo-500 rounded-full p-2	">
                        <DollarIcon className=" w-9" />
                    </div>
                );

            case "stable":
                return (
                    <div className="bg-indigo-500 rounded-full p-2	">
                        <StableIcon className=" w-9" />
                    </div>
                );
        }
    };

    const setIcon = (item) => {
        const diff = calDiff(item);
        return item?.key === "payouts"
            ? switchIcon("dollar")
            : diff > 0
            ? switchIcon("up")
            : diff === 0
            ? switchIcon("stable")
            : switchIcon("down");
    };

    return (
        <div className=" grid sm:grid-cols-2 md:grid-cols-3 gap-y-3  xl:grid-cols-4 gap-x-3 ">
            {GrisItems?.map((item) => (
                <GridItem
                    key={item?.key}
                    text={item?.text}
                    value={item?.data?.total}
                    Icon={setIcon(item)}
                    diff={calDiff(item)}
                />
            ))}
        </div>
    );
};

export default DashboardGrid;
