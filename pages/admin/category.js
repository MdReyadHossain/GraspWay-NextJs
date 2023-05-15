import CategoryEdit from "@/components/admin/_categoryEdit";
import CategoryView from "@/components/admin/_categoryView";
import CategotyTable from "@/components/admin/_categoryView";
import CourseChart from "@/components/admin/_dashboardBarChart";
import StudentChart from "@/components/admin/_dashboardLineChart";
import LayoutAdmin from "@/components/admin/_layoutAdmin";
import CardStats from "@/components/admin/_statusCard";
import Session from "@/components/session";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";

export default function Dashboard({ data }) {
    const router = useRouter();
    const [editId, setEditId] = useState(null);
    const [name, setName] = useState(null);
    const [nameError, setNameError] = useState('');

    const [editFormData, setEditFormData] = useState({
        id: 0,
        name: ""
    });

    const handleEditFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
    };

    const handleEditFormSubmit = async (event) => {
        event.preventDefault();

        const editedform = {
            id: editId,
            name: editFormData.Catagoryname
        };

        try {
            console.log(editedform);
            const res = await axios.put("http://localhost:3000/admin/customizeCategory",
                editedform, {
                headers: {
                    "Content-Type": "application/json"
                }
            }
            );
            setEditId(null);
            router.push("category");
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleEdit = (event, category) => {
        event.preventDefault();
        setEditId(category.id);

        event.preventDefault();
        const formData = {
            id: category.id,
            Catagoryname: category.Catagoryname
        }

        setEditFormData(formData);
    }

    const handleCancelClick = () => {
        setEditId(null);
    };

    const handleDelete = async (event, category) => {
        event.preventDefault();
        const editedform = {
            id: editId,
            name: editFormData.Catagoryname
        };
        try {
            const res = await axios.delete("http://localhost:3000/admin/deleteCategory/" + category.id,
                editedform, {
                headers: {
                    "Content-Type": "application/json"
                }
            }
            );
            router.push("category");
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleAddFormSubmit = async (event) => {
        event.preventDefault();
        let isValid = true;
        const editedform = {
            name: name
        };
        if (name == '') {
            setNameError('Name is required');
            setTimeout(() => {
                setNameError('');
            }, 2000);
            isValid = false;
        } else {
            setNameError('');
        }

        if (isValid) {
            try {
                console.log(editedform);
                const res = await axios.post("http://localhost:3000/admin/addCategory",
                    editedform, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
                );
                setEditId(null);
                router.push("category");
            }
            catch (error) {
                console.log(error);
            }
        }
    }
    return (
        <>
            <LayoutAdmin title="Dashboard">
                <div className="px-10 mx-auto w-full">
                    <div
                        className={
                            "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-slate-100 text-slate-500"
                        }
                    >
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                    <h3
                                        className={
                                            "font-semibold text-lg text-blueGray-700 text-slate-800"
                                        }
                                    >
                                        Category
                                    </h3>

                                </div>
                            </div>
                        </div>
                        <div className="block w-full overflow-x-auto h-96">
                            {/* Projects table */}
                            <form onSubmit={handleEditFormSubmit}>
                                <table className="items-center w-full bg-transparent border-collapse">
                                    <thead>
                                        <tr>
                                            <th
                                                className={
                                                    "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-slate-200 text-slate-800 border-slate-100"
                                                }
                                            >
                                                Category ID
                                            </th>
                                            <th
                                                className={
                                                    "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-slate-200 text-slate-800 border-slate-100"
                                                }
                                            >
                                                Category Name
                                            </th>

                                            <th
                                                className={
                                                    "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-slate-200 text-slate-800 border-slate-100"
                                                }
                                            >
                                                Category Edit
                                            </th>
                                            <th
                                                className={
                                                    "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-slate-200 text-slate-800 border-slate-100"
                                                }
                                            >
                                                Category Delete
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((item) => (
                                            <Fragment>
                                                {editId === item.id ?
                                                    <CategoryEdit
                                                        editFormData={editFormData}
                                                        handleEditFormChange={handleEditFormChange}
                                                        handleCancelClick={handleCancelClick}
                                                        handleDelete={handleDelete}
                                                    /> :
                                                    <CategoryView
                                                        item={item}
                                                        handleEdit={handleEdit}
                                                        handleDelete={handleDelete}
                                                    />
                                                }
                                            </Fragment>
                                        ))}
                                    </tbody>
                                </table>
                            </form>
                        </div>
                    </div >
                    <div className="relative flex flex-col min-w-0 break-words w-1/2 mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                        <form onSubmit={handleAddFormSubmit}>
                            <div className="rounded-t bg-slate-700 mb-0 px-6 py-6">
                                <div className="text-center flex justify-between">
                                    <h6 className="text-white text-lg font-bold">Category Information</h6>
                                    <button
                                        className="bg-slate-500 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md hover:bg-slate-600 outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                        type="submit"
                                        value={"update"}
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>
                            <div className="bg-slate-50 flex-auto px-4 lg:px-10 py-10 pt-0">
                                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                    Category Name
                                </h6>
                                {/* {success == 'Profile Successfully Updated!' ?
                                <div className="alert alert-success rounded p-2 m-1 text-white"><div><svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg><span>{success}</span></div></div> : success != '' ?
                                    <div className="alert alert-error rounded p-2 m-1 text-white"><div><svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg><span>{success}</span></div></div> :
                                    ''} */}
                                <div className="flex flex-wrap">
                                    <div className="w-full px-4">
                                        <div className="relative w-full mb-3">
                                            <input
                                                type="text"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                id="name"
                                                name="name"
                                                placeholder="Enter name"
                                                onChange={(event) => setName(event.target.value)}
                                            />
                                            {nameError && <p className="text-red-500" id="nameError">{nameError}</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </LayoutAdmin>
        </>
    )
}

export async function getServerSideProps() {
    const res = await axios.get('http://localhost:3000/admin/category?order=ASC');
    const data = await res.data;

    return { props: { data } };
}
