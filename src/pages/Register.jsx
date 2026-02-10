import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/authThunk";
import { useState } from "react";

export default function Register() {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);

    const [form, setForm] = useState({
        username : "",
        email: "",
        password: "",
    });

    const submit = (e) => {
        e.preventDefault();
        dispatch(registerUser(form));       
    };

    return (
        <div className="w-full max-w-sm mx-auto mt-15">
            <form className="bg-white shadow-md rounded px-10 pt-6 pb-8 mb-4" onSubmit={submit}>
                <div className="mb-8">
                    <h1 className='text-2xl font-bold text-center'>Register</h1>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Username
                    </label>
                    <input onChange={(e) => setForm({ ...form, username: e.target.value })} className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="name" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input onChange={(e) => setForm({ ...form, email: e.target.value })} className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="email" />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input onChange={(e) => setForm({ ...form, password: e.target.value })} className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
                    {error && <p className="text-red-500 text-xs italic">{error}</p>}
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-yellow-950 hover:bg-yellow-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    {loading ? "Signing up..." : "Sign Up"}
                    </button>
                    <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                    Forgot Password?
                    </a>
                </div>
            </form>
            <p className="text-center text-gray-500 text-xs">
                &copy;2020 Acme Corp. All rights reserved.
            </p>
        </div>
    )
}
