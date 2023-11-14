import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

export function ProtectedRoute() {
    const user = useSelector(state => state.users)
    return user.value ? <Outlet /> : <Navigate to="/login" />
}