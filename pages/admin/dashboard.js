import CourseChart from "@/components/admin/_dashboardBarChart";
import StudentChart from "@/components/admin/_dashboardLineChart";
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
    // console.log(data);
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
                                    statPercent="User"
                                    statPercentColor="text-emerald-500"
                                    statDescripiron="Visited"
                                    statIconName="MdTraffic"
                                    statIconColor="bg-red-500"
                                />
                            </div>
                            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                                <CardStats
                                    statDate={data.instructorDate}
                                    statSubtitle="INSTRUCTORS"
                                    statTitle={data.instructor}
                                    statArrow=""
                                    statPercent="Instructor"
                                    statPercentColor=""
                                    statDescripiron="Registered in total"
                                    statIconName="FaUserTie"
                                    statIconColor="bg-orange-500"
                                />
                            </div>
                            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                                <CardStats
                                    statDate={data.studentDate}
                                    statSubtitle="STUDENTS"
                                    statTitle={data.student}
                                    // statArrow="down"
                                    statPercent="Student"
                                    statPercentColor="text-orange-500"
                                    statDescripiron="Registered in total"
                                    statIconName="FaUserGraduate"
                                    statIconColor="bg-pink-500"
                                />
                            </div>
                            <div className="w-full lg:w-6/12 xl:w-3/12 px-4 ">
                                <CardStats
                                    statDate={data.courseDate}
                                    statSubtitle="COURSES"
                                    statTitle={data.course}
                                    // statArrow="up"
                                    statPercent="Course"
                                    statPercentColor=""
                                    statDescripiron="Created"
                                    statIconName="FaBook"
                                    statIconColor="bg-blue-600"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-4 flex flex-wrap">
                    <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 my-4">
                        <StudentChart student={data.studentDate} />
                    </div>
                    <div className="w-full xl:w-4/12 px-4 my-4">
                        <CourseChart course={data.courseDate} />
                    </div>
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
