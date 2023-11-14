import { useState } from "react";
import { useDispatch } from "react-redux";
import { generatePath, useNavigate } from "react-router-dom";
import { Line } from "../components/basic/line";
import { path } from "../constants/client-path";
import logo from '../img/logo.png'
import { logInService } from "../service/auth/login";
import { setUser } from "../state/reducers/user-slice";

export function LogIn() {
    const navigate = useNavigate();

    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLoginButton = async(e) => {
        e.preventDefault();

        const {user} = await logInService(email, password);

        dispatch(setUser({user}));
        navigate(generatePath(path.PROFILE, {username: "siddhant"}))
    }

    return (
        <div className="flex flex-col-reverse h-screen w-screen items-center md:flex-row">
            <div className="basis-3/4 m-2 w-4/6 md:h-[90vh] md:basis-1/2">
                <div className="box-border w-full h-5/6 m-auto md:w-5/12 md:h-3/4 md:mt-14 md:mr-10 md:flex md:items-center">
                    <div className="w-full">
                        <h1 className="text-center text-blue text-xl font-bold md:text-3xl cursor-pointer" onClick={() => navigate(path.DASHBOARD)}>NYX</h1>
                        <h2 className="text-center text-blue text-xl font-thin underline decoration-yellow-light decoration-6 md:text-3xl">Log In</h2>
                        <form>
                            <div className="flex flex-col">
                                <input type="text" id="username" className="text-blue text-base outline-none w-5/6 mt-10 p-2.5 placeholder:text-blue" placeholder="Username" onChange={({ target }) => setEmail(target.value)} value={email} required />
                                <Line />
                                <input type="password" id="password" className="text-blue text-base outline-none block w-5/6 mt-10 p-2.5 placeholder:text-blue" placeholder="Password" onChange={({ target }) => setPassword(target.value)} value={password} required />
                                <Line />

                                <h2 className="text-left text-sm text-blue font-thin cursor-pointer md:text-base">Forgot Password</h2>
                                <button className="w-1/2 h-1/12 mt-7 m-auto bg-blue text-yellow-light text-xl font-bold rounded-full md:text-3xl" onClick={handleLoginButton} disabled={!email || password.length < 1}>
                                    LOGIN
                                </button>
                                <h2 className="text-center text-blue text-sm cursor-pointer md:text-base" onClick={() => navigate(path.SIGNUP)}>Create New Account?</h2>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="basis-1/4 m-2 w-full md:h-[90vh] md:basis-1/2 md:w-1/2">
                <div className="box-border w-1/2 h-5/6 mt-10 m-auto md:w-5/12 md:h-3/4 md:flex md:items-center md:ml-10">
                    <img src={logo} alt="logo" className="cursor-pointer" onClick={() => navigate(path.DASHBOARD)} />
                </div>
            </div>
        </div>
    )
}