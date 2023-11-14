import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Line } from "../components/basic/line";
import { path } from "../constants/client-path";
import logo from '../img/logo.png'
import { registerUser } from "../service/auth/registerUser";
import { setUser } from "../state/reducers/user-slice";

export function SignUp() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [phone, setPhone] = useState()


    const handleSignup = async(e) => {
        e.preventDefault();

        const {user} = await registerUser(firstName, lastName, username, email, password, phone)

        dispatch(setUser({user}))
        navigate(path.DASHBOARD)
    }

    const alredyRegistered = (e) => {
        e.preventDefault();
        navigate(path.LOGIN);
    }

    const navigateToHome = (e) => {
        e.preventDefault();
        navigate(path.DASHBOARD)
    }
    return (
        <div className="flex flex-col-reverse h-screen w-screen items-center md:flex-row">
            <div className="basis-3/4 m-2 w-4/6 md:h-[90vh] md:basis-1/2">
                <div className="box-border w-full h-5/6 m-auto md:w-5/12 md:h-3/4 md:mt-16 md:mr-10 md:flex md:items-center">
                    <div className="w-full">
                        <h1 className="text-center text-blue text-xl font-bold md:text-3xl cursor-pointer" onClick={navigateToHome}>NYX</h1>
                        <h2 className="text-center text-blue text-xl font-thin underline decoration-yellow-light decoration-6 md:text-3xl">Sign Up</h2>
                        <form>
                            <div className="flex flex-col">
                                <input type="text" id="email" className="text-blue text-base outline-none w-5/6 mt-2 p-2.5 placeholder:text-blue" placeholder="Email" onChange={({ target }) => setEmail(target.value)} value={email} required />
                                <Line />
                                <input type="text" id="first_name" className="text-blue text-base outline-none w-5/6 mt-2 p-1.5 placeholder:text-blue" placeholder="First Name" onChange={({ target }) => setFirstName(target.value)} value={firstName} required />
                                <Line />
                                <input type="text" id="last_name" className="text-blue text-base outline-none w-5/6 mt-2 p-1.5 placeholder:text-blue" placeholder="Last Name" onChange={({ target }) => setLastName(target.value)} value={lastName} required />
                                <Line />
                                <input type="text" id="username" className="text-blue text-base outline-none w-5/6 mt-2 p-1.5 placeholder:text-blue" placeholder="Username" onChange={({ target }) => setUsername(target.value)} value={username} required />
                                <Line />
                                <input type="text" id="phone" className="text-blue text-base outline-none w-5/6 mt-2 p-1.5 placeholder:text-blue" placeholder="Phone" onChange={({ target }) => setPhone(target.value)} value={phone} required />
                                <Line />
                                <input type="password" id="password" className="text-blue text-base outline-none w-5/6 mt-2 p-1.5 placeholder:text-blue" placeholder="Password" onChange={({ target }) => setPassword(target.value)} value={password} required />
                                <Line />
                                <input type="password" id="confirmPassword" className="text-blue text-base outline-none block w-5/6 mt-2 p-1.5 placeholder:text-blue" placeholder="Confirm Password" onChange={({ target }) => setConfirmPassword(target.value)} value={confirmPassword} required />
                                <Line />

                                <button className="w-1/2 h-1/12 mt-7 m-auto bg-blue text-yellow-light text-xl font-bold rounded-full md:text-2xl" onClick={handleSignup} disabled={password !== confirmPassword}>
                                    SIGN UP
                                </button>
                                <h2 className="text-center text-blue text-sm cursor-pointer md:text-base" onClick={alredyRegistered}>Already Registered?</h2>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="basis-1/4 m-2 w-full md:h-[90vh] md:basis-1/2 md:w-1/2">
                <div className="box-border w-1/2 h-5/6 mt-10 m-auto md:w-5/12 md:h-3/4 md:flex md:items-center md:ml-10">
                    <img src={logo} alt="logo" className="cursor-pointer" onClick={navigateToHome} />
                </div>
            </div>
        </div>
    )
}