import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import axios from "axios"
import { useRouter } from 'next/router'


export default function CardSettings() {
    let imageError = true;

    const [id, setId] = useState();
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [joinYr, setJoinYr] = useState('');
    const [phoneNo, setphoneNo] = useState('');

    const [nameError, setNameError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [joinYrError, setJoinYrError] = useState('');
    const [phoneNoError, setphoneNoError] = useState('');

    useEffect(() => {
        setId(sessionStorage.getItem('Id') || '');
        setImage("http://localhost:3000/admin/getimage/" + sessionStorage.getItem('image') || '');
        setName(sessionStorage.getItem('admin_name') || '');
        setAddress(sessionStorage.getItem('address') || '');
        setEmail(sessionStorage.getItem('email') || '');
        setJoinYr(sessionStorage.getItem('joiningYear') || '');
        setphoneNo(sessionStorage.getItem('phoneNo') || '');
    }, []);

    const validate = () => {
        let isValid = true;
        if (name === '') {
            setNameError('Username is required');
            setTimeout(() => {
                setNameError('');
            }, 2000);
            isValid = false;
        } else {
            setNameError('');
        }

        if (email === '') {
            setEmailError('Email is required');
            setTimeout(() => {
                setEmailError('');
            }, 2000);
            isValid = false;
        } else {
            setEmailError('');
        }

        if (address === '') {
            setAddressError('Address is required');
            setTimeout(() => {
                setAddressError('');
            }, 2000);
            isValid = false;
        } else {
            setAddressError('');
        }

        if (joinYr !== sessionStorage.getItem('joiningYear')) {
            setJoinYrError('Joining Year unable to edit!');
            setTimeout(() => {
                setJoinYrError('');
            }, 2000);
            isValid = false;
        } else {
            setJoinYrError('');
        }

        if (phoneNo === '') {
            setphoneNoError('Phone Number is required');
            setTimeout(() => {
                setphoneNoError('');
            }, 2000);
            isValid = false;
        } else {
            setphoneNoError('');
        }

        return isValid;
    };

    const router = useRouter();
    const {
        register,
        handleSubmit,
        reset,
    } = useForm();

    const validateFile = (value) => {
        const file = value[0];
        if (file) {
            console.log(file);
            const allowedtypes = ["image/jpg", "image/png", "image/jpeg"];
            imageError = false;
            setImage(file.name);
            if (!allowedtypes.includes(file.type)) {
                return false;
            }
            console.log(`Image : ${imageError}`);
        }
    }
    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     sessionStorage.setItem('name', name);
    //     alert('Profile updated successfully!');
    // };

    const [success, setSuccess] = useState('')

    const onSubmit = async (data) => {
        console.log(data);
        console.log(imageError);
        if (validate()) {
            const formData = new FormData();
            formData.append('id', id);
            formData.append('admin_name', name);
            formData.append('email', email);
            formData.append('phoneNo', phoneNo);
            formData.append('address', address);
            formData.append('joiningYear', joinYr);
            if (!imageError)
                formData.append('adminImage', data.image[0]);
            try {
                const res = await axios.patch("http://localhost:3000/admin/editprofile/", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });
                console.log(res);

                sessionStorage.setItem('Id', id);
                sessionStorage.setItem('admin_name', name);
                sessionStorage.setItem('address', address);
                sessionStorage.setItem('email', email);
                sessionStorage.setItem('joiningYear', joinYr);
                sessionStorage.setItem('phoneNo', phoneNo);
                if (!imageError)
                    sessionStorage.setItem('image', res.data.image);

                imageError = true;
                router.push('/admin/settings');

                setSuccess("Profile Successfully Updated!");
                setTimeout(() => {
                    setSuccess('');
                }, 3000);
            }
            catch (error) {
                // console.log(error.response.data.message);

                setSuccess('Update unsuccessfull: ' + error);
            }
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">

                    <div className="rounded-t bg-slate-700 mb-0 px-6 py-6">
                        <div className="text-center flex justify-between">
                            <h6 className="text-white text-xl font-bold">My account</h6>
                            <button
                                className="bg-slate-500 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md hover:bg-slate-600 outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                type="submit"
                                value={"update"}
                            >
                                {success == 'Profile Successfully Updated!' ? <span>Wait...</span> : <span>Update</span>}
                            </button>
                        </div>
                    </div>
                    <div className="bg-slate-50 flex-auto px-4 lg:px-10 py-10 pt-0">
                        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                            User Information
                        </h6>
                        {success == 'Profile Successfully Updated!' ?
                            <div className="alert alert-success rounded p-2 m-1 text-white"><div><svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg><span>{success}</span></div></div> : success != '' ?
                                <div className="alert alert-error rounded p-2 m-1 text-white"><div><svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg><span>{success}</span></div></div> :
                                ''}
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
                                        id="name"
                                        name="name"
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                    />
                                    {nameError && <p className="text-red-500" id="nameError">{nameError}</p>}
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
                                        name="email"
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                    />
                                    {emailError && <p className="text-red-500">{emailError}</p>}
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
                                        name="joiningYear"
                                        value={joinYr}
                                        disabled
                                    />
                                    {joinYrError && <p className="text-red-500">{joinYrError}</p>}
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
                                        name="address"
                                        value={address}
                                        onChange={(event) => setAddress(event.target.value)}
                                    />
                                    {addressError && <p className="text-red-500">{addressError}</p>}
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
                                        name="phoneNo"
                                        value={phoneNo}
                                        onChange={(event) => setphoneNo(event.target.value)}
                                    />
                                    {phoneNoError && <p className="text-red-500">{phoneNoError}</p>}
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
                                        value="1229"
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
                                        accept="image/png,.jpg,.jpeg"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        {...register('image', { validate: validateFile })}
                                    />
                                </div>
                                <input type="text" value={id} onChange={(event) => setId(event.target.value)} hidden />
                            </div>
                        </div>
                        <hr className="mt-6 border-b-1 border-blueGray-300" />
                    </div>
                </div >
            </form>
        </>
    );
}
