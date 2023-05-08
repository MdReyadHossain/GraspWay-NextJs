import LayoutHome from "@/components/_layoutHome"
import React, { useEffect, useState } from 'react';
import { Player } from 'video-react';
import { CldVideoPlayer } from 'next-cloudinary';


export default function Home() {
    const course = "cooking";
    const video = "lec-1";

    return (
        <>
            <LayoutHome title="Graspway" />
            <h1>Hello</h1>

            {/* <video width="80%" height="50%" controls muted>
                <source src={"http://localhost:3000/instructor/course/" + course + "/" + video} type="video/mp4" />
            </video> */}
        </>
    )
}
