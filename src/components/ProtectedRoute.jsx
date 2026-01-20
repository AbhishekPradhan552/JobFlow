import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({children}){
    const {user, loading} = useAuth();

    if(loading){
        return <p>Checking authentication...</p>
    }
    //not logged in -> redirect to login
    if(!user){
        return <Navigate to = "/login" replace /> 
    }
    //logged in ->allow access
    return children
}