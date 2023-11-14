import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { path } from '../../constants/client-path';
import logo from '../../img/logo.png'
import { DropDown } from './dropdown';
import { useSelector } from 'react-redux';

export function Navbar() {
    const navigate = useNavigate();
    const user = useSelector(state => state.users)

    return (
        <div className="h-8 p-5 lg:h-12">
            <div className="flex flex-row justify-between items-center px-2">
                <div className='h-6 w-12 lg:h-8 mr-2 lg:m-2 lg:w-16'>
                    <img src={logo} alt="Logo" onClick={() => navigate(path.DASHBOARD)}/>
                </div>
                <div className="w-1/2 h-6 flex flex-row mx-2 items-center justify-center lg:w-1/2 lg:h-10">
                    <input type="search" className="form-control bg-blue bg-opacity-25 border-solid border-gray-300 w-full h-full rounded-2xl transition ease-in-out m-0 px-4 focus:outline-none" placeholder="Search" aria-label="Search" />
                    <SearchIcon />
                </div>

                <div className='-mr-8 lg:-mr-4'>
                    {
                        user.value ? <DropDown username={user.value.user.username}/> : (
                        <div>
                            <button className='bg-blue text-yellow-light rounded-lg px-1 py-0.5 md:px-4 md:py-2 mr-4' onClick={() => navigate(path.LOGIN)}>
                                LOGIN
                            </button>
                        </div>)
                    }
                </div>

            </div>
        </div>
    )
}