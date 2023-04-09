import Header from "./_Header";
import Link from "next/link";
import Image from "next/image";

export default function LayoutHome(props) {
    return (
        <>
            <Header title={props.title} />

            <nav>
                <Link href="/">
                    <Image className="inline-block" src="/Graspway-original.png" alt="graspway" width={80} height={0} />
                </Link>
                <Link href="/catagory"> Catagories | </Link>
                <Link href="/login">Login | </Link>
                <Link href="/registration">Registration </Link>
            </nav>



        </>
    )
}