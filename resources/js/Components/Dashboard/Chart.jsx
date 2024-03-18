import { setPeriod } from "@/redux/features/chart/chartSlice";
import { useGetPeriodQuery } from "@/redux/services/statsApi/statsApi";
import { LineChart } from "@mantine/charts";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Chart = () => {
    const dispatch = useDispatch();
    const period = useSelector((state) => state?.chart?.period);

    const { data, isLoading, isError, isSuccess } = useGetPeriodQuery({
        period,
    });

    const format = (data) => {
        return data?.map((el) => ({
            period: period === "year" ? el?.month : el?.date,
            valor: el?.totalLeadsValue,
        }));
    };

    const switchBtnClasses = (period, val) =>
        ` ${
            period === val ? "bg-indigo-500 text-white" : "bg-white text-black "
        } w-20 inline-block rounded  py-1.5 border-2 border-indigo-500 `;

    const handlePeriodSwitch = (period) => {
        dispatch(setPeriod(period));
    };

    return (
        <div className="bg-white overflow-auto p-3 row-start-7 md:row-start-3 xl:row-start-2 col-span-1 self-start sm:col-span-2 rounded shadow-md">
            <div className="mb-4 flex sm:flex-row flex-col items-center px-3 justify-between">
                <div className=" self-start mb-2 md:mb-0">
                    <span className="text-[10px] text-gray-400">
                        visión general
                    </span>
                    <h5 className="text-gray-700">Valor de Leads</h5>
                </div>

                <div className="flex gap-x-2">
                    <button
                        onClick={() => handlePeriodSwitch("week")}
                        className={switchBtnClasses(period, "week")}
                    >
                        Semana
                    </button>
                    <button
                        onClick={() => handlePeriodSwitch("month")}
                        className={switchBtnClasses(period, "month")}
                    >
                        Mes
                    </button>
                    <button
                        onClick={() => handlePeriodSwitch("year")}
                        className={switchBtnClasses(period, "year")}
                    >
                        Año
                    </button>
                </div>
            </div>
            <div>
                {isSuccess ? (
                    <div className="relative z-30">
                        <LineChart
                            className=" h-[200px] md:h-[300px] "
                            unit=" $"
                            data={format(data?.data)}
                            dataKey="period"
                            series={[{ name: "valor", color: "indigo.6" }]}
                            tooltipAnimationDuration={200}
                            curveType="natural"
                        />
                    </div>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
};

export default Chart;
