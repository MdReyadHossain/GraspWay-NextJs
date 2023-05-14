import { useState } from "react";

export default function CategoryEdit({ editFormData, handleEditFormChange, handleCancelClick, handleDelete }) {
    return (
        <>
            <tr>
                <th className="border-t-2 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-center">
                    <input
                        type="text"
                        className="cursor-no-drop border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150 text-center"
                        value={editFormData.id}
                        name="id"
                        onChange={handleEditFormChange}
                        disabled
                    />
                </th>

                <td className="border-t-2 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-center">
                    <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150 text-center"
                        value={editFormData.Catagoryname}
                        name="Catagoryname"
                        onChange={handleEditFormChange}
                    />
                </td>

                <td className="border-t-2 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-center">
                    <button className="btn btn-outline btn-success mx-1" type="submit">Save</button>
                    <button className="btn btn-outline btn-warning" onClick={handleCancelClick}>Cancel</button>
                </td>

                <td className="border-t-2 border-l-0 border-r-0  text-center">
                    <button className="btn btn-outline btn-error" onClick={(event) => handleDelete(event, item)}>Delete</button>
                </td>
            </tr>
        </>
    )
} 