import LayoutHome from "@/components/_layoutHome"
import React from 'react';
import { Player } from 'video-react';
import { CldVideoPlayer } from 'next-cloudinary';


export default function Home() {
    return (
        <>
            <LayoutHome title="Graspway" />
            <h1>Hello</h1>
        </>
    )
}
