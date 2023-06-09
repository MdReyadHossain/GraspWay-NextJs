import InstructorChart from "@/components/admin/_instructorChartCard";
import LayoutAdmin from "@/components/admin/_layoutAdmin";
import CardStats from "@/components/admin/_statusCard";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Dashboard({ data }) {
    const [visits, setVisit] = useState('');
    useEffect(() => {
        setVisit(localStorage.getItem('user_visits'));
    })
    console.log(data);
    return (
        <>
            <LayoutAdmin title="Dashboard">
                <div className="px-4 mx-auto w-full">
                    <div>
                        {/* Card stats */}
                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                                <CardStats
                                    statSubtitle="TRAFFIC"
                                    statTitle={visits}
                                    statArrow="up"
                                    statPercent="3.48"
                                    statPercentColor="text-emerald-500"
                                    statDescripiron="Since last month"
                                    statIconName="MdTraffic"
                                    statIconColor="bg-red-500"
                                />
                            </div>
                            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                                <CardStats
                                    statSubtitle="INSTRUCTORS"
                                    statTitle={data.instructor}
                                    statArrow="down"
                                    statPercent="3.48"
                                    statPercentColor="text-red-500"
                                    statDescripiron="Since last month"
                                    statIconName="FaUserTie"
                                    statIconColor="bg-orange-500"
                                />
                            </div>
                            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                                <CardStats
                                    statSubtitle="STUDENTS"
                                    statTitle={data.student}
                                    statArrow="down"
                                    statPercent="1.10"
                                    statPercentColor="text-orange-500"
                                    statDescripiron="Since last month"
                                    statIconName="FaUserGraduate"
                                    statIconColor="bg-pink-500"
                                />
                            </div>
                            <div className="w-full lg:w-6/12 xl:w-3/12 px-4 ">
                                <CardStats
                                    statSubtitle="COURSES"
                                    statTitle={data.course}
                                    statArrow="up"
                                    statPercent="12"
                                    statPercentColor="text-emerald-500"
                                    statDescripiron="Since last month"
                                    statIconName="FaBook"
                                    statIconColor="bg-blue-600"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-4 flex flex-wrap">
                    <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
                        <InstructorChart />
                    </div>
                    {/* <div className="w-full xl:w-4/12 px-4">
                        <CardBarChart />
                    </div> */}
                </div>
            </LayoutAdmin>
        </>
    )
}

export async function getServerSideProps() {
    const res = await axios.get('http://localhost:3000/admin/dashboard');
    const data = await res.data;

    return { props: { data } }
}
