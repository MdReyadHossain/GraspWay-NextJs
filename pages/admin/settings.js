import LayoutAdmin from "@/components/admin/_layoutAdmin";
import CardStats from "@/components/admin/_statusCard";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import CardSettings from "@/components/admin/_settingsCard";
import CardProfile from "@/components/admin/_profileCard";

export default function Settings({ data }) {
    return (
        <>
            <LayoutAdmin title="Dashboard">
                <div className="flex flex-wrap">
                    <div className="w-full lg:w-8/12 px-4">
                        <CardSettings />
                    </div>
                    <div className="w-full lg:w-4/12 px-4">
                        <CardProfile
                            instructor={data.instructor}
                            student={data.student}
                            manager={data.manager} />
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