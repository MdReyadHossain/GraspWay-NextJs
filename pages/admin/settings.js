import LayoutAdmin from "@/components/_layoutAdmin"
import CardStats from "@/components/_statusCard";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import CardSettings from "@/components/_settingsCard";
import CardProfile from "@/components/_profileCard";

export default function Profile() {
    return (
        <>
            <LayoutAdmin title="Dashboard">
                <div className="flex flex-wrap">
                    <div className="w-full lg:w-8/12 px-4">
                        <CardSettings />
                    </div>
                    <div className="w-full lg:w-4/12 px-4">
                        <CardProfile />
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
