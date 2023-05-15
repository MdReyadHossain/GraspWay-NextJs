import Footer from "@/components/_footer";
import LayoutStudent from "@/components/student/_layoutStudent";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function EditProfileCard() {
    const [id, setId] = useState();
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNo, setphoneNo] = useState('');

    const [nameError, setNameError] = useState('');
    const [dobError, setDobError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneNoError, setphoneNoError] = useState('');

    useEffect(() => {
        setId(sessionStorage.getItem('Id'));
        setName(sessionStorage.getItem('student_name'));
        setDob(sessionStorage.getItem('dob'));
        setEmail(sessionStorage.getItem('email'));
        setphoneNo(sessionStorage.getItem('phoneNo'));
    }, []);

    const {
        register,
        handleSubmit,
        reset,
    } = useForm();

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

        if (dob !== '') {
            setDobError('Date of Birth is required!');
            setTimeout(() => {
                setDobError('');
            }, 2000);
            isValid = false;
        } else {
            setDobError('');
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

    const [success, setSuccess] = useState('')

    const onSubmit = async (data) => {
        console.log(data);

        if (validate()) {
            const formData = new FormData();
            formData.append('id', id);
            formData.append('student_name', name);
            formData.append('email', email);
            formData.append('phoneNo', phoneNo);
            formData.append('joiningYear', dob);
            try {
                const res = await axios.patch("http://localhost:3000/admin/editprofile/", formData, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                console.log(res);

                sessionStorage.setItem('Id', id);
                sessionStorage.setItem('student_name', name);
                sessionStorage.setItem('email', email);
                sessionStorage.setItem('dob', dob);
                sessionStorage.setItem('phoneNo', phoneNo);

                router.push('profile');

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
    }
    return (
        <>
            <LayoutStudent title="Profile" />
            <form onSubmit={handleSubmit(onSubmit)} className="mb-20">
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
                <div className="bg-white flex-auto px-4 lg:px-10 py-10 pt-0">
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
                                    Date of Birth
                                </label>
                                <input
                                    type="text"
                                    className="cursor-no-drop border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    name="joiningYear"
                                    value={dob}
                                />
                                {dobError && <p className="text-red-500">{dobError}</p>}
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
                                    value="Dhaka, Bangladesh"
                                    onChange={(event) => setAddress(event.target.value)}
                                />
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
                        <input type="text" value={id} onChange={(event) => setId(event.target.value)} hidden />
                    </div>
                </div>
            </form>
            <Footer />
        </>
    )
}