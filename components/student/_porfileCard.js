import Footer from "@/components/_footer";
import LayoutStudent from "@/components/student/_layoutStudent";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProfileCard() {
    const [id, setId] = useState();
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNo, setphoneNo] = useState('');

    useEffect(() => {
        setId(sessionStorage.getItem('Id'));
        setName(sessionStorage.getItem('student_name'));
        setDob(sessionStorage.getItem('dob'));
        setEmail(sessionStorage.getItem('email'));
        setphoneNo(sessionStorage.getItem('phoneNo'));
    });
    return (
        <>
            <main className="profile-page mt-96">
                <section className="block h-500-px">
                    <div
                        className=" absolute top-0 w-full h-full bg-center bg-cover"
                        style={{
                            backgroundImage:
                                "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
                        }}
                    >
                        <span
                            id="blackOverlay"
                            className="w-full h-full absolute opacity-50 bg-black"
                        ></span>
                    </div>
                    <div
                        className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-16"
                        style={{ transform: "translateZ(0)" }}
                    >
                        <svg
                            className="absolute bottom-0 overflow-hidden"
                            xmlns="http://www.w3.org/2000/svg"
                            preserveAspectRatio="none"
                            version="1.1"
                            viewBox="0 0 2560 100"
                            x="0"
                            y="0"
                        >
                            <polygon
                                className="text-slate-200 fill-current"
                                points="2560 0 2560 100 0 100"
                            ></polygon>
                        </svg>
                    </div>
                </section>
                <section className="relative py-16 bg-slate-200">
                    <div className="container mx-auto px-4">
                        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                            <div className="px-6">
                                <div className="flex flex-wrap justify-center">
                                    <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                        <div className="">
                                            <img
                                                alt="..."
                                                src="/img/zebin.jpg"
                                                className="h-32 shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                                        <div className="py-6 px-3 mt-32 sm:mt-0">
                                            <Link href={"editProfile"}>
                                                <button
                                                    className="bg-slate-700 active:bg-slate-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                                                    type="button"
                                                >
                                                    Edit Profile
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-4/12 px-4 lg:order-1">
                                        <div className="flex justify-center py-4 lg:pt-4 pt-8">
                                            <div className="mr-4 p-3 text-center">
                                                <span className="text-xl font-bold block uppercase tracking-wide text-slate-600">
                                                    22
                                                </span>
                                                <span className="text-sm text-slate-400">
                                                    Total Courses
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center mt-12">
                                    <h3 className="text-4xl font-semibold leading-normal text-slate-700 mb-2">
                                        {name}
                                    </h3>
                                    <div className="text-sm leading-normal mt-0 mb-2 text-slate-400 font-bold uppercase">
                                        <i className="fas fa-map-marker-alt mr-2 text-lg text-slate-400"></i>{" "}
                                        Dhaka, Bangladesh
                                    </div>
                                    <div className="mb-2 text-slate-600 mt-10">
                                        <i className="fas fa-briefcase mr-2 text-lg text-slate-400"></i>
                                        {email}
                                    </div>
                                    <div className="mb-2 text-slate-600">
                                        <i className="fas fa-university mr-2 text-lg text-slate-400"></i>
                                        {phoneNo}
                                    </div>
                                </div>
                                <div className="mt-10 py-10 border-t border-slate-200 text-center">
                                    <div className="flex flex-wrap justify-center">
                                        <div className="w-full lg:w-9/12 px-4">
                                            <p className="mb-4 text-lg leading-relaxed text-slate-700">
                                                Dedicated and passionate software student with a keen
                                                interest in computer science and technology. They have
                                                always been fascinated by the power of software to solve
                                                real-world problems and make a positive impact on people's lives.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}