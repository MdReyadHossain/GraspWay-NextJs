import LayoutHome from "@/components/_layoutHome"

export default function Login() {
    return (
        <>
            <LayoutHome title="Login" />
            <div className="w-screen flex justify-center">
                <form action="/admin/dashboard">
                    <table class="table">
                        <tbody>
                            <tr>
                                <th><label htmlFor="user">Username</label></th>
                                <td> : <input className="border-2 border-black rounded-sm" type="text" name="username" id="user" placeholder="name" /></td>
                            </tr>
                            <tr>
                                <th><label htmlFor="pass">Password</label></th>
                                <td> : <input className="border-2 border-black rounded-sm" type="password" name="password" id="pass" placeholder="password" /></td>
                            </tr>
                        </tbody>
                    </table>
                    <input className=" bg-lime-500 px-2 py-1 hover:ring-2 ring-slate-800" type="submit" value={"Login"} />
                </form>
            </div>
        </>
    )
}