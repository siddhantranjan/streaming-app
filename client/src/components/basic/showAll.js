import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useNavigate, generatePath } from 'react-router-dom';
import { path } from '../../constants/client-path';

export function ShowAll({ category }) {
    const navigate = useNavigate()
    return (
        <div className="relative flex py-4 items-center mx-auto w-3/4 md:w-1/2">
            <div className="flex-grow border-t border-yellow-light"></div>
            <span className="flex-shrink mx-4 text-blue">Show All <ArrowDropDownIcon onClick={() => navigate(generatePath(path.CATEGORY_VIDEO, { category }))} className="cursor-pointer"/> </span>
            <div className="flex-grow border-t border-yellow-light"></div>
        </div>
    )
}