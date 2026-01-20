import {useState} from 'react'
import { useNavigate,Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

import Card from "../components/ui/Card"
import Form from "../components/ui/Form"
import Input from "../components/ui/Input"
import Button from "../components/ui/Button"

export default function Login(){
    const [email, setEmail]= useState("")
    const [password, setPassword]= useState("")
    const [error, setError]= useState(null)

    const {login,loading}= useAuth()
    const navigate = useNavigate()

    async function handleSubmit(e){
        e.preventDefault()
        setError(null)

        try{
            await login(email,password)
            navigate("/dashboard")
        }catch(err){
            setError("Invalid email or password")
        }
    }
     return (

        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <Card className="w-full max-w-md p-6">
                {/* Header */}
                <div className="mb-6 text-center">
                    <h1 className="text-2xl font-semibold text-slate-900">
                        Sign in to JobFlow
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Track applications. Stay organized. Get hired.
                    </p>
                </div>

                {/* Error */}
                {error && (
                <div className="mb-4 rounded bg-red-50 px-3 py-2 text-sm text-red-600">
                    {error}
                </div>
                )}

                {/* Form */}
                <Form onSubmit={handleSubmit}>
                <Input
                    label="Email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <Input
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <Button
                    type="submit"
                    className="w-full mt-2"
                    disabled={loading}
                >
                    {loading ? "Signing in..." : "Sign in"}
                </Button>
                </Form>

                {/* Footer */}
                <div className="mt-6 text-center text-sm text-slate-500">
                 Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="font-medium text-blue-600 hover:underline"
                    >
                        Create one
                    </Link>
                </div>
            </Card>
        </div>
  )
}