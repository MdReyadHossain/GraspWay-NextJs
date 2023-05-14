import axios from "axios";
import { useEffect, useState } from "react";

export default function CountCourse({ categoryId }) {
    let id = parseInt(categoryId);
    const [data, setData] = useState();
    useEffect(() => {
        const countCourse = async () => {
            const response = await axios.get("http://localhost:3000/admin/categoryCourses/" + categoryId);
            // const data = await response.json();
            // console.log(data);
            setData(response);
        }
        countCourse();
    })
}