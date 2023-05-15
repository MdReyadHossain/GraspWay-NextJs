import Header from "../_header";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { Children, useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from 'react';
import SwitchTheme from "../_switchTheme";
import { AiFillDashboard, AiOutlineUser, AiOutlineSetting } from "react-icons/ai";
import { BiCategory, BiBook } from "react-icons/bi";
import { BsGraphUpArrow, BsFillClipboardCheckFill } from "react-icons/bs";
import { FaUserPlus } from "react-icons/fa";
import FooterAdmin from "./_footerAdmin";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import Session from "../session";

export default function LayoutAdmin({ children }) {
    const router = useRouter();
    const [image, setImage] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {
        setImage(sessionStorage.getItem('image'));
        setName(sessionStorage.getItem('admin_name'));
    });

    const firebaseConfig = {
        apiKey: "AIzaSyCFhDBY67ZzAAmlYeVW-lTac-KK7FA1zVY",
        authDomain: "graspway-80b44.firebaseapp.com",
        databaseURL: "https://graspway-80b44-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "graspway-80b44",
        storageBucket: "graspway-80b44.appspot.com",
        messagingSenderId: "832397616364",
        appId: "1:832397616364:web:30accde802dd4f292bb1c9",
        measurementId: "G-W6X526YXRW"
    };
    firebase.initializeApp(firebaseConfig);
    useEffect(() => {
        let views;
        firebase.database()
            .ref()
            .child("page_view")
            .on("value", (snap) => {
                views = snap.numChildren();
                console.log(views);
                localStorage.setItem('user_visits', views);
            });
    })


    return (
        <>
            <Header title="Admin Panel" />
            <Session />
            <div className="drawer drawer-mobile bg-slate-100">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle " />
                <div className="drawer-content min-h-screen">
                    <div className="z-10 lg:sticky lg:top-0 navbar backdrop-blur-sm">
                        <div className="flex-1">
                            <label htmlFor="my-drawer-2" className="btn btn-circle swap swap-rotate drawer-button lg:hidden bg-white border-none">
                                <input type="checkbox" />
                                <svg className="swap-off fill-current text-gray-800" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" /></svg>
                                <svg className="swap-on fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" /></svg>
                            </label>
                        </div>
                        <div className="flex-none gap-2">
                            <form className="form-control">
                                <input type="text" placeholder="Search" className="bg-slate-50 input w-32 lg:w-60" />
                            </form>
                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img title={name} src={"http://localhost:3000/admin/getimage/" + image} alt="admin" />
                                    </div>
                                </label>
                                <ul tabIndex={0} className="mt-3 p-2 drop-shadow-lg menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                                    <li>
                                        <Link href="/admin/settings" className="justify-between">
                                            Settings
                                        </Link>
                                    </li>
                                    <li><a href="/admin/logout">Logout</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex-none gap-2" hidden><SwitchTheme /></div>
                    </div>
                    <div className={""}>
                        <div className="bg-blue-950 md:pt-10 pb-32 pt-12 h-96">
                            {children}
                            {/* <div className="h-screen"></div> */}
                            <div className="w-full m-auto">
                                <FooterAdmin />
                            </div>
                        </div>
                    </div>
                </div>

                {/* {Admin Sidebar} */}
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu w-60 bg-slate-700 text-slate-200">
                        <li className="text-2xl text-white m-2">Admin Panal</li>
                        <br />
                        {/* <!-- Sidebar content here --> */}
                        <li className={router.pathname.indexOf("/admin/dashboard") !== -1
                            ? "bg-indigo-700 hover:bg-slate-800"
                            : "hover:bg-slate-800 p-3"}>
                            <Link href={"/admin/dashboard"}><AiFillDashboard className="" />Dashboard</Link>
                        </li>
                        <li className={router.pathname.indexOf("/admin/category") !== -1
                            ? "bg-indigo-700 hover:bg-slate-800"
                            : "hover:bg-slate-800 p-3"}>
                            <Link href={"/admin/category"}><BiCategory className="" />Category</Link>
                        </li>
                        <li className={router.pathname.indexOf("/admin/course") !== -1
                            ? "bg-indigo-700 hover:bg-slate-800"
                            : "hover:bg-slate-800 p-3"}>
                            <Link href={"/admin/category"}><BiBook className="" />Course</Link>
                        </li>
                        <li className={router.pathname.indexOf("/admin/revenue") !== -1
                            ? "bg-indigo-700 hover:bg-slate-800"
                            : "hover:bg-slate-800 p-3"}>
                            <Link href={"/admin/category"}><BsGraphUpArrow className="" />Revenue</Link>
                        </li>
                        <li className={router.pathname.indexOf("/admin/request") !== -1
                            ? "bg-indigo-700 hover:bg-slate-800"
                            : "hover:bg-slate-800 p-3"}>
                            <Link href={"/admin/category"}><FaUserPlus className="" />Request</Link>
                        </li>
                        <li className={router.pathname.indexOf("/admin/notice") !== -1
                            ? "bg-indigo-700 hover:bg-slate-800"
                            : "hover:bg-slate-800 p-3"}>
                            <Link href={"/admin/category"}><BsFillClipboardCheckFill className="" />Notice Board</Link>
                        </li>
                        <li className={router.pathname.indexOf("/admin/settings") !== -1
                            ? "bg-indigo-700 hover:bg-slate-800"
                            : "hover:bg-slate-800 p-3"}>
                            <Link href={"/admin/settings"}><AiOutlineSetting className="" />Settings</Link>
                        </li>
                    </ul>
                </div>
            </div>

        </>
    )
}