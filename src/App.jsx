import {Routes,Route} from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"
import { useState } from 'react'

import Landing from "./pages/Landing"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Applications from "./pages/Applications"

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import ProtectedRoute from "./components/ProtectedRoute"
import Landing from "./pages/Landing"


export default function App(){
  return(
    <div className="min-h-screen bg-slate-50" >
      <Navbar/>
      <main className="max-w-6xl mx-auto px-6 py-8">
        <Routes>
          <Route path="/" element={<Landing/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/login" element={<Login/>}/>
          
          <Route path="/applications" 
          element={
            <ProtectedRoute><Applications/></ProtectedRoute>
          }/>
          <Route path="/dashboard" 
          element={
            <ProtectedRoute><Dashboard/></ProtectedRoute>
          }/>
        </Routes>
      </main>
      
    </div>
  )
}
