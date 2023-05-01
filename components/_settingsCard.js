import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import axios from "axios"
import { useRouter } from 'next/router'


export default function CardSettings() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const validateFile = (value) => {
        const file = value[0];
        const allowedtypes = ["image/jpg", "image/png", "image/jpeg"];

        if (!allowedtypes.includes(file.type)) {
            return false;
        }
    }

    const [success, setSuccess] = useState('')
    const onSubmit = async (data) => {
        console.log(data);
        const formData = new FormData();
        formData.append('admin_name', data.name);
        formData.append('password', data.password);
        formData.append('email', data.email);
        formData.append('phoneNo', data.phoneNo);
        formData.append('address', data.address);
        formData.append('joiningYear', data.joiningYear);
        formData.append('adminImage', data.image[0]);
        console.log(formData);
        try {
            const res = await axios.post("localhost:3000/admin/editprofile/",
                formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            console.log(res.data);
            // sessionStorage.setItem('Id', res.data.session.Id);
            // sessionStorage.setItem('admin_name', res.data.session.admin_name);
            // sessionStorage.setItem('address', res.data.session.address);
            // sessionStorage.setItem('email', res.data.session.email);
            // sessionStorage.setItem('joiningYear', res.data.session.joiningYear);
            // sessionStorage.setItem('phoneNo', res.data.session.phoneNo);
            // sessionStorage.setItem('image', res.data.session.image);
        }
        catch (error) {
            console.log(error.response.data.message);

            setSuccess('Admin add unsuccessfull ' + error.response.data.message);
        }
    };

    const [id, setId] = useState();
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [joinYr, setJoinYr] = useState('');
    const [phoneNo, setphoneNo] = useState('');

    useEffect(() => {
        setId(sessionStorage.getItem('Id'));
        setImage(sessionStorage.getItem('image'));
        setName(sessionStorage.getItem('admin_name'));
        setPassword(sessionStorage.getItem('password'));
        setAddress(sessionStorage.getItem('address'));
        setEmail(sessionStorage.getItem('email'));
        setJoinYr(sessionStorage.getItem('joiningYear'));
        setphoneNo(sessionStorage.getItem('phoneNo'));
    });

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">

                    <div className="rounded-t bg-slate-700 mb-0 px-6 py-6">
                        <div className="text-center flex justify-between">
                            <h6 className="text-white text-xl font-bold">My account</h6>
                            <button
                                className="bg-slate-500 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md hover:bg-slate-600 outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                type="submit"
                                value={"update"}
                            >
                                Update
                            </button>
                        </div>
                    </div>
                    <div className="bg-slate-50 flex-auto px-4 lg:px-10 py-10 pt-0">
                        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                            User Information
                        </h6>
                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        defaultValue={name}
                                        name="name"
                                        {...register('name', { required: true })}
                                    />
                                    {errors.name && <p className="text-red-500">Username is required</p>}
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Email address
                                    </label>
                                    <input
                                        type="email"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        defaultValue={email}
                                        {...register('email', { required: true })}
                                    />
                                    {errors.email && <p className="text-red-500">Email is required</p>}
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Joining Year
                                    </label>
                                    <input
                                        type="text"
                                        className="cursor-no-drop border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        defaultValue={joinYr}
                                        disabled
                                        {...register('joiningYear', { required: true })}
                                    />
                                </div>
                            </div>
                        </div>

                        <hr className="mt-6 border-b-1 border-blueGray-300" />

                        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                            Contact Information
                        </h6>
                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-12/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        defaultValue={address}
                                        {...register('address', { required: true })}
                                    />
                                    {errors.address && <p className="text-red-500">Address is required</p>}
                                </div>
                            </div>
                            <div className="w-full lg:w-4/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Phone No
                                    </label>
                                    <input
                                        type="text"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        defaultValue={phoneNo}
                                        {...register('phoneNo', { required: true })}
                                    />
                                    {errors.phoneNo && <p className="text-red-500">Phone Number is required</p>}
                                </div>
                            </div>
                            <div className="w-full lg:w-4/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Country
                                    </label>
                                    <input
                                        type="text"
                                        className="cursor-no-drop border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        defaultValue="Bangladesh"
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className="w-full lg:w-4/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Postal Code
                                    </label>
                                    <input
                                        type="text"
                                        className="cursor-no-drop border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        defaultValue="1229"
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>

                        <hr className="mt-6 border-b-1 border-blueGray-300" />
                        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                            Image
                        </h6>
                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Upload Profile Picture
                                    </label>
                                    <input
                                        type="file"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        defaultValue={image}
                                        {...register('image', { required: true, validate: validateFile })}
                                    />
                                    {errors.image &&
                                        <p>
                                            {errors.image.type === 'required'
                                                ?
                                                <p id="outlined_error_help" className="text-red-500"><span className="text-red-500">Image is required</span></p>
                                                :

                                                <p id="outlined_error_help" className="text-red-500"><span className="text-red-500">Invalid file</span></p>
                                            }
                                        </p>}
                                </div>
                                <input type="number" defaultValue={id} {...register('admin_name', { required: true })} hidden />
                            </div>
                        </div>
                        <hr className="mt-6 border-b-1 border-blueGray-300" />
                        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                            Varification
                        </h6>
                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Password ?
                                    </label>
                                    <input
                                        type="password"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        name="password"
                                        {...register('password', { required: false })}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </form>
        </>
    );
}
