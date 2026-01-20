import {Link, useNavigate} from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import NavbarView from './Navbarview';

export default function Navbar(){
    const {user, logout} = useAuth()
    const navigate = useNavigate()

    function handlelogout(){
        logout()
        navigate("/login",{replace:true})
    }
    return(
        <NavbarView 
        user={user}
        onLogout={handlelogout}
        />

    )
}
