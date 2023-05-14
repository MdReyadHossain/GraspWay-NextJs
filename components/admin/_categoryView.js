import React, { useEffect, useState } from "react";
import CountCourse from "./_countCourse";
import { useRouter } from "next/router";

export default function CategoryView({ item, handleEdit, handleDelete }) {
    return (
        <>
            <tr>
                <th className="border-t-2 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-center">
                    {item.id}
                </th>

                <td className="border-t-2 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-center">
                    {item.Catagoryname}
                </td>

                <td className="border-t-2 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-center">
                    <button className="btn btn-outline btn-primary" onClick={(event) => handleEdit(event, item)}>Edit</button>
                </td>

                <td className="border-t-2 border-l-0 border-r-0  text-center">
                    <button className="btn btn-outline btn-error" onClick={(event) => handleDelete(event, item)}>Delete</button>
                </td>
            </tr>
        </>
    );
}


export async function getServerSideProps({ query }) {

}