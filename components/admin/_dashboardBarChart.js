import { useEffect, useRef } from "react";
import Chart from "chart.js";

export default function CourseChart({ course }) {
    let effectRan = useRef(false);
    const today = new Date();

    useEffect(() => {
        if (effectRan.current === false) {
            let currjan = 0, currmay = 0, currsep = 0;
            let lastjan = 0, lastmay = 0, lastsep = 0;
            for (let i = 0; i < course.length; i++) {
                today.getFullYear() == course[i].year ?
                    course[i].month <= 3 ? currjan++ :
                        course[i].month <= 7 ? currmay++ :
                            course[i].month <= 11 ? currsep++ : '' :
                    today.getFullYear() - 1 == course[i].year ?
                        course[i].month <= 3 ? lastjan++ :
                            course[i].month <= 7 ? lastmay++ :
                                course[i].month <= 11 ? lastsep++ : '' : ''
            }
            let config = {
                type: "bar",
                data: {
                    labels: [
                        "Jan-Apr", "May-Aug", "Sep-Dec"
                    ],
                    datasets: [
                        {
                            label: new Date().getFullYear(),
                            backgroundColor: "#ed64a6",
                            borderColor: "#ed64a6",
                            data: [currjan, currmay, currsep],
                            fill: false,
                            barThickness: 40,
                        },
                        {
                            label: new Date().getFullYear() - 1,
                            fill: false,
                            backgroundColor: "#4c51bf",
                            borderColor: "#4c51bf",
                            data: [lastjan, lastmay, lastsep],
                            barThickness: 40,
                        },
                    ],
                },
                options: {
                    maintainAspectRatio: false,
                    responsive: true,
                    title: {
                        display: false,
                        text: "Orders Chart",
                    },
                    tooltips: {
                        mode: "index",
                        intersect: false,
                    },
                    hover: {
                        mode: "nearest",
                        intersect: true,
                    },
                    legend: {
                        labels: {
                            fontColor: "black",
                        },
                        align: "end",
                        position: "bottom",
                    },
                    scales: {
                        xAxes: [
                            {
                                display: true,
                                scaleLabel: {
                                    display: false,
                                    labelString: "Month",
                                },
                                gridLines: {
                                    display: false,
                                    borderDash: [2],
                                    borderDashOffset: [2],
                                    color: "rgba(33, 37, 41, 0.3)",
                                    zeroLineColor: "rgba(33, 37, 41, 0.3)",
                                    zeroLineBorderDash: [2],
                                    zeroLineBorderDashOffset: [2],
                                },
                            },
                        ],
                        yAxes: [
                            {
                                display: true,
                                scaleLabel: {
                                    display: false,
                                    labelString: "Value",
                                },
                                gridLines: {
                                    borderDash: [2],
                                    drawBorder: false,
                                    borderDashOffset: [2],
                                    color: "rgba(33, 37, 41, 0.2)",
                                    zeroLineColor: "rgba(33, 37, 41, 0.15)",
                                    zeroLineBorderDash: [2],
                                    zeroLineBorderDashOffset: [2],
                                },
                            },
                        ],
                    },
                },
            };
            let ctx = document.getElementById("bar-chart").getContext("2d");
            window.myBar = new Chart(ctx, config);
        }
        return () => effectRan.current = true;
    }, []);
    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full max-w-full flex-grow flex-1">
                            <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
                                Performance
                            </h6>
                            <h2 className="text-blueGray-700 text-xl font-semibold">
                                Course Purchase
                            </h2>
                        </div>
                    </div>
                </div>
                <div className="p-4 flex-auto">
                    {/* Chart */}
                    <div className="relative h-96">
                        <canvas id="bar-chart"></canvas>
                    </div>
                </div>
            </div>
        </>
    );
}
