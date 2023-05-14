import { useEffect, useRef } from "react";
import Chart from "chart.js";

export default function StudentChart({ student }) {
    let effectRan = useRef(false);
    useEffect(() => {
        if (effectRan.current === false) {
            const currYear = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            const lastYear = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            console.log(student);
            const today = new Date();
            for (let i = 0; i < student.length; i++) {
                today.getFullYear() == student[i].year ?
                    currYear[student[i].month]++ :
                    today.getFullYear() - 1 == student[i].year ?
                        lastYear[student[i].month]++ : '';
            }

            let config = {
                type: "line",
                data: {
                    labels: [
                        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
                    ],
                    datasets: [
                        {
                            label: new Date().getFullYear(),
                            backgroundColor: "#4c51bf",
                            borderColor: "#4c51bf",
                            data: [currYear[0], currYear[1], currYear[2], currYear[3], currYear[4], currYear[5], currYear[6], currYear[7], currYear[8], currYear[9], currYear[10], currYear[11]],
                            fill: false,
                        },
                        {
                            label: new Date().getFullYear() - 1,
                            fill: false,
                            backgroundColor: "#fff",
                            borderColor: "#fff",
                            data: [lastYear[0], lastYear[1], lastYear[2], lastYear[3], lastYear[4], lastYear[5], lastYear[6], lastYear[7], lastYear[8], lastYear[9], lastYear[10], lastYear[11]],
                        },
                    ],
                },
                options: {
                    maintainAspectRatio: false,
                    responsive: true,
                    title: {
                        display: false,
                        text: "Sales Charts",
                        fontColor: "white",
                    },
                    legend: {
                        labels: {
                            fontColor: "white",
                        },
                        align: "end",
                        position: "bottom",
                    },
                    tooltips: {
                        mode: "index",
                        intersect: false,
                    },
                    hover: {
                        mode: "nearest",
                        intersect: true,
                    },
                    scales: {
                        xAxes: [
                            {
                                ticks: {
                                    fontColor: "rgba(255,255,255,.7)",
                                },
                                display: true,
                                scaleLabel: {
                                    display: false,
                                    labelString: "Month",
                                    fontColor: "white",
                                },
                                gridLines: {
                                    display: false,
                                    borderDash: [2],
                                    borderDashOffset: [2],
                                    color: "rgba(33, 37, 41, 0.3)",
                                    zeroLineColor: "rgba(0, 0, 0, 0)",
                                    zeroLineBorderDash: [2],
                                    zeroLineBorderDashOffset: [2],
                                },
                            },
                        ],
                        yAxes: [
                            {
                                ticks: {
                                    fontColor: "rgba(255,255,255,.7)",
                                },
                                display: true,
                                scaleLabel: {
                                    display: false,
                                    labelString: "Value",
                                    fontColor: "white",
                                },
                                gridLines: {
                                    borderDash: [3],
                                    borderDashOffset: [3],
                                    drawBorder: false,
                                    color: "rgba(255, 255, 255, 0.15)",
                                    zeroLineColor: "rgba(33, 37, 41, 0)",
                                    zeroLineBorderDash: [2],
                                    zeroLineBorderDashOffset: [2],
                                },
                            },
                        ],
                    },
                },
            };
            var ctx = document.getElementById("line-chart").getContext("2d");
            window.myLine = new Chart(ctx, config);
        }
        return () => effectRan.current = true;
    }, []);
    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-slate-800">
                <div className="rounded-t mb-0 px-4 py-3 bg-slate-800">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full max-w-full flex-grow flex-1">
                            <h6 className="uppercase text-slate-100 mb-1 text-xs font-semibold">
                                Overview
                            </h6>
                            <h2 className="text-white text-xl font-semibold">Student</h2>
                        </div>
                    </div>
                </div>
                <div className="p-4 flex-auto">
                    {/* Chart */}
                    <div className="relative h-96">
                        <canvas id="line-chart"></canvas>
                    </div>
                </div>
            </div>
        </>
    );
}
