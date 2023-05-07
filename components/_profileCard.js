import { useEffect, useState } from "react";

export default function CardProfile({ instructor, student, manager }) {
    const [id, setId] = useState();
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [joinYr, setJoinYr] = useState('');
    const [phoneNo, setphoneNo] = useState('');

    useEffect(() => {
        setId(sessionStorage.getItem('Id'));
        setImage(sessionStorage.getItem('image'));
        setName(sessionStorage.getItem('admin_name'));
        setAddress(sessionStorage.getItem('address'));
        setEmail(sessionStorage.getItem('email'));
        setJoinYr(sessionStorage.getItem('joiningYear'));
        setphoneNo(sessionStorage.getItem('phoneNo'));
    });

    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
                <div className="px-6">
                    <div className="flex flex-wrap justify-center">
                        <div className="relative w-full px-4 flex justify-center">
                            <div className="">
                                <img
                                    alt="admin"
                                    src={"http://localhost:3000/admin/getimage/" + image}
                                    className="shadow-xl rounded-full h-auto w-1/2 sm:w-1/3 align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                                />
                            </div>
                        </div>
                        <div className="w-full px-4 text-center mt-20">
                            <div className="flex justify-center py-4 lg:pt-4 pt-8">
                                <div className="mr-4 p-3 text-center">
                                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                                        {instructor}
                                    </span>
                                    <span className="text-sm text-blueGray-400">Instructor</span>
                                </div>
                                <div className="mr-4 p-3 text-center">
                                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                                        {manager}
                                    </span>
                                    <span className="text-sm text-blueGray-400">Manager</span>
                                </div>
                                <div className="lg:mr-4 p-3 text-center">
                                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                                        {student}
                                    </span>
                                    <span className="text-sm text-blueGray-400">Student</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center mt-12">
                        <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700">
                            {name}
                        </h3>
                        <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold">
                            <i className="mr-2 text-lg text-blueGray-400"></i>{" "}
                            {email}
                        </div>
                        <div className="mb-2 text-blueGray-600 mt-10">
                            <i className="mr-2 text-lg text-blueGray-400"></i>
                            Graspway - Online Education Team
                        </div>
                        <div className="mb-2 text-blueGray-600">
                            <i className="mr-2 text-lg text-blueGray-400"></i>
                            {address}
                        </div>
                    </div>
                    <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                        <div className="flex flex-wrap justify-center">
                            <div className="w-full lg:w-9/12 px-4">
                                <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                                    Admin Profile
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
