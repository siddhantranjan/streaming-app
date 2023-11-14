import { Navigate, Outlet} from "react-router";
import { path } from "../constants/client-path";
import { useSelector } from "react-redux";


export function IsUserLoggedIn() {
    const user = useSelector(state => state.users)
    return user.value ? <Navigate to={path.DASHBOARD} /> : <Outlet />
}