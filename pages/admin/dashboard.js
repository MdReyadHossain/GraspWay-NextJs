import LayoutAdmin from "@/components/_layoutAdmin"
import axios from "axios";
import Link from "next/link";

export default function Dashboard({ data }) {
    return (
        <>
            <LayoutAdmin title="Dashboard">
                <div className="w-auto flex gap-24 h-40">
                    <Link href={"./users/instructor"} className="drop-shadow-xl rounded-md flex-auto bg-white w-2 h-36 flex justify-center items-center hover:drop-shadow-none">
                        <div className="text-center text-xl">
                            <p>
                                Instructor <br />
                                {data.instructor}
                            </p>
                        </div>
                    </Link>
                    <Link href={"./users/manager"} className="drop-shadow-xl rounded-md flex-auto bg-white w-2 h-36 flex justify-center items-center hover:drop-shadow-none">
                        <div className="text-center text-xl">
                            <p>
                                Manager <br />
                                {data.manager}
                            </p>
                        </div>
                    </Link>
                    <Link href={"./users/student"} className="drop-shadow-xl rounded-md flex-auto bg-white w-2 h-36 flex justify-center items-center hover:drop-shadow-none">
                        <div className="text-center text-xl">
                            <p>
                                Student <br />
                                {data.student}
                            </p>
                        </div>
                    </Link>
                </div>
            </LayoutAdmin>


        </>
    )
}

export async function getServerSideProps() {
    const res = await axios.get('http://localhost:3000/admin/dashboard');
    const data = await res.data;

    return { props: { data } }
}
