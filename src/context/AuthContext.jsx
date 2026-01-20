import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext()

export function AuthProvider({children}){
    const [user, setUser]= useState(null)
    const [loading, setLoading]= useState(true)
    const API_URL = import.meta.env.VITE_API_URL;
    // restore session on refresh
    useEffect(()=>{
        const token = localStorage.getItem("token")
        if(token){
            setUser({token})
        }
        setLoading(false)
    },[])

    async function login(email,password){
        setLoading(true)
        try{
            const res = await fetch (`${API_URL}/api/auth/login`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body: JSON.stringify({email,password}),
            })

            if(!res.ok){                
                throw new Error ("Invalid credentials")
            }

            const data = await res.json()
            localStorage.setItem("token",data.token)
            setUser({token: data.token})
        }finally{
            setLoading(false)

        }
    }

    async function register( name,email, password){
        setLoading(true)
        try{
            const res = await fetch(`${API_URL}/api/auth/register`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",                    
                },
                body: JSON.stringify({name , email, password})
            })

            if(!res.ok){
                const err = await res.json()
                throw new Error (err.message || "Registration failed")
            }
            const data= await res.json()
            localStorage.setItem("token",data.token)
            setUser({token: data.token})
        }finally{
            setLoading(false)
        }
    }

    
    function logout(){
        localStorage.removeItem("token")
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{user, login,register, logout, loading}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    return useContext(AuthContext)
}