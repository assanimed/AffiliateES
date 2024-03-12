import React, { Suspense, lazy } from "react";
import GridItem from "./GridItem";
import LineUp from "./LineUp";
import LineDown from "./LineDown";
import DollarIcon from "./DollarIcon";
import { usePage } from "@inertiajs/react";
import StableIcon from "./StableIcon";
import PerformanceIcon from "./PerformanceIcon";
import PayoutBoard from "./PayoutBoard";
import CouponBoard from "./CouponBoard";
import { Spinner } from "@nextui-org/react";

const Chart = lazy(() => import("./Chart"));

const UserDashboardGrid = () => {
    const {
        props: {
            auth: {
                user: { affiliate },
            },
            data: { earning, leads, notShipped, performance, balance },
        },
    } = usePage();

    const calDiff = (item) => {
        if (item?.key === "performance")
            return item?.data?.currentMonth - item?.data?.lastMonth;

        if (item?.data?.lastMonth === item?.data?.currentMonth) return 0;

        if (item?.data?.lastMonth === 0) return 100;

        return (item?.data?.currentMonth * 100) / item?.data?.lastMonth - 100;
    };

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
            case "performance":
                return (
                    <div className="bg-slate-50 shadow-lg rounded-full p-2	">
                        <PerformanceIcon className=" w-9" />
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
        if (item?.key === "performance") {
            return switchIcon("performance");
        }

        const diff = calDiff(item);
        return item?.key === "payouts"
            ? switchIcon("dollar")
            : diff > 0
            ? switchIcon("up")
            : diff === 0
            ? switchIcon("stable")
            : switchIcon("down");
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
            key: "earning",
            data: earning,
            text: "TOTAL EARNING",
        },
        {
            key: "performance",
            data: performance,
            text: "Performance",
        },
    ];

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
            <Suspense
                fallback={
                    <div className=" col-span-2 bg-white rounded shadow-md flex place-content-center">
                        <Spinner />
                    </div>
                }
            >
                <Chart />
            </Suspense>
            <PayoutBoard balance={balance} />
            <CouponBoard coupon={affiliate?.coupon} />
        </div>
    );
};

export default UserDashboardGrid;
