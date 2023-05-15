import Footer from "@/components/_footer";
import LayoutStudent from "@/components/student/_layoutStudent";
import ProfileCard from "@/components/student/_porfileCard";
import { Fragment } from "react";
import { useEffect, useState } from "react";

export default function Profile() {
    return (
        <>
            <LayoutStudent title="Profile" />
            <ProfileCard />
            <Footer />
        </>
    )
}