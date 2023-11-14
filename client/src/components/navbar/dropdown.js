import PersonIcon from '@mui/icons-material/Person';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, generatePath } from 'react-router-dom';
import { path } from '../../constants/client-path';
import {logOutUser} from '../../service/auth/logout';
import {unsetUser} from '../../state/reducers/user-slice'

export function DropDown({username}) {
    const [dropdownShow, setDropDownShow] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const setDropDown = (e) => {
        e.preventDefault();
        setDropDownShow(!dropdownShow)
    }
    const handleLogOut = async(e) => {
        e.preventDefault();

        await logOutUser();
        dispatch(unsetUser())
        navigate(path.DASHBOARD)
    }
    return (
        <div className="w-24 h-full">
            <div className='w-full p-2 flex items-center justify-center' onClick={setDropDown}>
                <PersonIcon fontSize='large' className=' cursor-pointer'/>
            </div>
            <ul className={`bg-blue bg-opacity-90 text-yellow-light rounded-md px-4 py-1 fixed right-5 cursor-pointer text-xs w-4/6 h-fit flex flex-row items-center justify-between ${dropdownShow ? "visible": "hidden"} md:w-1/3 lg:w-40 lg:flex-col lg:px-8 lg:text-base lg:mt-2 lg:right-16 z-20`}>
                <li className='p-2' onClick={() => navigate(generatePath(path.PROFILE, { username }))}>Profile</li>
                <li className='p-2' onClick={() => navigate(path.PROFILE)}>Settings</li>
                <li className='p-2' onClick={() => navigate(path.PROFILE)}>Help</li>
                <li className='p-2 lg:p-4' onClick={handleLogOut}>Log Out</li>
            </ul>
        </div>
    )
}