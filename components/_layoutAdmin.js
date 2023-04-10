import Header from "./_header";
import Link from "next/link";
import Head from "next/head";
import { Children } from "react";

export default function LayoutAdmin({ children }) {
    return (
        <>
            <Header title="Admin Panel" />
            <div className="flex h-screen">
                <nav className="flex flex-col w-72 h-screen bg-gray-900 text-gray-200">
                    <p className="text-2xl text-white font-bold p-4">Admin Panel<span className="text-sm text-slate-400"> Graspway</span></p>
                    <ul className="py-4">
                        <li className="px-6 py-2">
                            <Link className="text-gray-400 hover:text-white" href="/admin/dashboard">
                                Dashboard
                            </Link>
                        </li>
                        <li className="px-6 py-2">
                            <Link className="text-gray-400 hover:text-white" href="/">
                                Courses
                            </Link>
                        </li>
                        <li className="px-6 py-2">
                            <Link className="text-gray-400 hover:text-white" href="/">
                                Users
                            </Link>
                        </li>
                    </ul>
                    <div style={{ position: 'absolute', bottom: 0, width: "100%" }}>
                        Graspway @Copyright 2023
                    </div>
                </nav>
                <div className="flex-1 bg-gray-100">
                    <nav className="flex items-center justify-between p-6 bg-white shadow-md">
                        {/* Top navigation */}
                    </nav>
                    <main className="p-6">
                        {children}
                    </main>
                </div>
            </div>

        </>
    )
}