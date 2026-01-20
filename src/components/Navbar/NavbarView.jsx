import { NavLink, Link } from "react-router-dom";
import Button from "../ui/Button";

export default function NavbarView({user, onLogout}){
    return(
        <header className="sticky top-0 z-50 bg-white border-b border-slate-200" >
            <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link
                 to="/"
                 className="text-lg font-bold tracking-tight text-slate-800">
                    Job <span className="text-blue-600">Flow</span>
                </Link>

                {/* Navigation  */}
                <div className="flex items-center gap-6">
                    {!user && (
                        <>
                        <NavLink to="/login" className={({isActive})=>
                        `text-sm font-medium ${
                            isActive?"text-blue-600":"text-slate-600 hover:text-slate-900"
                        }`
                        }>
                            Login
                        </NavLink>

                        <NavLink to="/register"
                            className={({isActive})=>
                            `text-sm font-medium ${isActive? "text-blue-600":"text-slate-600 hover:text-slate-900"}`}                        
                        >
                            Register
                        </NavLink>                        
                        </>                       
                    )}
                    {user && (
                        <>
                        <div className="flex items-center gap-8">
                            <div className="flex items-center gap-6">
                                <NavLink
                                to="/dashboard"
                                className={({isActive})=>`text-sm font-medium ${isActive? "text-blue-600": "text-slate-600 hover:text-slate-900"}`}>
                                    Dashboard
                                </NavLink>

                                <NavLink
                                to="/applications"
                                className={({isActive})=>`text-sm font-medium ${isActive? "text-blue-600": "text-slate-600 hover:text-slate-900"}`}>
                                    Applications
                                </NavLink>
                            </div>
                        
                          <Button variant="danger" size="sm" onClick={onLogout}>Logout</Button>
                        </div>
                        
                        </>
                    )}
                     
                </div>

            </nav>
        </header>
    )
}