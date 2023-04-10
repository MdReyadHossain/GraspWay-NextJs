import Header from "./_header";
import Link from "next/link";
import Image from "next/image";

export default function LayoutHome(props) {
    return (
        <>
            <Header title={props.title} />

            <nav className="flex flex-row">
                <div className="basis-1/1">
                    <Link href="/">
                        <Image src="/Graspway-original.png" alt="graspway" width={80} height={0} />
                    </Link>
                </div>
                <div className="basis-1/4">
                    <a href="/catagory"> Catagories </a>
                </div>
                <div className="basis-1/4">
                    <a href="/login">Login </a>
                </div>
                <div className="basis-2/1">
                    <a href="/registration">Registration </a>
                </div>
            </nav>

            <main>

            </main>

            <div style={{ position: 'absolute', bottom: 0, width: "100%" }}>
                Graspway @Copyright 2023
            </div>
        </>
    )
}