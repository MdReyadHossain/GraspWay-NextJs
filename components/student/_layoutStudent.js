import Link from "next/link";
import Header from "../_header";
import Image from "next/image";
import { FaShoppingCart } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function LayoutStudent(props) {
    const [name, setName] = useState('');

    useEffect(() => {
        setName(sessionStorage.getItem('student_name'));
    });
    return (
        <>
            <Header title={props.title} />
            <header class="z-10 relative lg:sticky lg:top-0 w-full text-gray-600 body-font bg-white">
                <div class="container mx-auto flex flex-wrap p-3 flex-col md:flex-row items-center">
                    <nav class="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto">
                        <Link href={"/catagory"} class="mr-12 hover:text-indigo-600 ">Catagory</Link>
                        <Link href={"/courses"} class="mr-12 hover:text-indigo-600">Courses</Link>
                        <Link href={""} class="mr-12 hover:text-indigo-600">About us</Link>
                    </nav>

                    <a href="/" class="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0">
                        <Image src="/graspway-ico.svg" alt="graspway" width={30} height={0} />
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                        <span class="ml-3 text-xl">Graspway</span>
                    </a>

                    <div class="lg:w-2/5 inline-flex lg:justify-end mt-4 lg:ml-0 lg:mt-0 items-center">
                        <div className="flex items-center">
                            <label htmlFor="search-item"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" /></svg></label>
                            <input className="border border-gray-200 rounded-2xl mx-2 py-1 px-3 leading-6 w-full focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" type="text" id="search" name="search-items" placeholder="Search" />
                        </div>

                        <div className="dropdown dropdown-end px-1">
                            <label tabIndex={0} className="btn btn-ghost btn-circle">
                                <div className="indicator">
                                    <FaShoppingCart size={28} />
                                </div>
                            </label>
                        </div>
                        {" "}
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img title={name} src="/img/user/user.jpg" />
                                </div>
                            </label>
                            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                                <li>
                                    <Link href={"/student/profile"} className="justify-between">
                                        Profile
                                    </Link>
                                </li>
                                <li><a>Settings</a></li>
                                <li>
                                    <Link href={"/student/logout"}>
                                        Logout
                                    </Link>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
            </header >
        </>
    )
}