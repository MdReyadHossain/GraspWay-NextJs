import LayoutHome from "@/components/_layoutHome";
import { headers } from "@/next.config";
import Header from "@/components/_header";
import axios from "axios";
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { useNavigate, Redirect } from "react-router-dom";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import SwitchTheme from "@/components/_switchTheme";


export default function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const [success, setSuccess] = useState('');
    const router = useRouter();
    const onSubmit = async (data) => {
        try {
            const res = await axios.post("http://localhost:3000/login",
                data, {
                headers: {
                    "Content-Type": "application/json"
                },
                // withCredentials: true
            });
            if (res.data.success) {
                console.log(res.data.user);
                console.log(res.data.sessionID);
                switch (res.data.user) {
                    case "admin":
                        sessionStorage.setItem('sessionID', res.data.sessionID);
                        sessionStorage.setItem('Id', res.data.session.Id);
                        sessionStorage.setItem('admin_name', res.data.session.admin_name);
                        sessionStorage.setItem('address', res.data.session.address);
                        sessionStorage.setItem('email', res.data.session.email);
                        sessionStorage.setItem('joiningYear', res.data.session.joiningYear);
                        sessionStorage.setItem('phoneNo', res.data.session.phoneNo);
                        sessionStorage.setItem('image', res.data.session.image);
                        router.push('/admin/dashboard');
                        break;
                    case "manager":
                        router.push("/manager/dashboard");
                        break;
                    case "instructor":
                        router.push("/instructor/dashboard");
                        break;
                    case "student":
                        sessionStorage.setItem('sessionID', res.data.sessionID);
                        sessionStorage.setItem('Id', res.data.session.Id);
                        sessionStorage.setItem('student_name', res.data.session.student_name);
                        sessionStorage.setItem('dob', res.data.session.dob);
                        sessionStorage.setItem('email', res.data.session.email);
                        sessionStorage.setItem('phoneNo', res.data.session.phoneNo);
                        router.push("/");
                        break;
                    default:
                        setSuccess(res.data.message);
                }
            }
            setSuccess(res.data.message);
        }
        catch (error) {
            console.log(error);
            // console.log(error.response.data.message);

            // setSuccess('Unsuccessfull: ' + error.response.data.message);
        }
    };

    return (
        <>
            <div hidden><SwitchTheme /></div>
            <Header title="Login" />
            <div className="flex justify-center items-center h-screen bg-slate-100">
                <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="bg-white p-8 rounded shadow-md">
                    <a href="/" class="flex order-first lg:order-none title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0">
                        <Image src="/graspway-ico.svg" alt="graspway" width={30} height={0} />
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                        <span class="ml-3 text-xl">Graspway</span>
                    </a>

                    {success == 'Login Successfull!' ?
                        <div className="alert alert-success rounded p-2 m-1 text-white"><div><svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg><span>{success}</span></div></div> : success != '' ?
                            <div className="alert alert-error rounded p-2 m-1 text-white"><div><svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg><span>{success}</span></div></div> :
                            ''}

                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            id="username"
                            placeholder="username"
                            {...register('username', { required: true })}
                        />
                        {errors.username && <p className="text-red-500">Username is required</p>}
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="password"
                            id="password"
                            placeholder="password"
                            {...register('password', { required: true })}
                        />
                        {errors.password && <p className="text-red-500">Password is required</p>}
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                            value={"Login"}
                        >
                            Login
                        </button>
                        <Link className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="/register">
                            Create an Account
                        </Link>
                    </div>
                </form>
            </div>
        </>
    )
}
