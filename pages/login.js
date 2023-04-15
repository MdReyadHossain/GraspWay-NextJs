import LayoutHome from "@/components/_layoutHome";
import { headers } from "@/next.config";
import axios from "axios";
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { useNavigate, Redirect } from "react-router-dom";

export default function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const [success, setSuccess] = useState('');
    const onSubmit = async (data) => {
        try {
            const res = await axios.post("http://localhost:3000/login",
                data, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            console.log(res.data.success);
            if (res.data.success) {
                console.log(res.data.user);
                switch (res.data.user) {
                    case "admin":
                        window.location.replace('/admin/dashboard');
                        break;
                    case "manager":
                        window.location.replace('/manager/dashboard');
                        break;
                    case "instructor":
                        window.location.replace('/instructor/dashboard');
                        break;
                    case "student":
                        window.location.replace('/student/dashboard');
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
            <LayoutHome title="Login" />
            <div className="text-center">{success}</div>
            <div className="w-screen flex justify-center">
                <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                    <table class="table">
                        <tbody>
                            <tr>
                                <th><label htmlFor="user">Username</label></th>
                                <td> : <input className="border-2 border-black rounded-sm" type="text" id="username" placeholder="username" {...register('username', { required: true })} />{errors.username && <p>Username is required</p>}</td>
                            </tr>
                            <tr>
                                <th><label htmlFor="pass">Password</label></th>
                                <td> : <input className="border-2 border-black rounded-sm" type="password" id="password" placeholder="password" {...register('password', { required: true })} />{errors.password && <p>Password is required</p>}</td>
                            </tr>
                        </tbody>
                    </table>
                    <input className=" bg-lime-500 px-2 py-1 hover:ring-2 ring-slate-800" type="submit" value={"Login"} />
                </form>
            </div>
        </>
    )
}