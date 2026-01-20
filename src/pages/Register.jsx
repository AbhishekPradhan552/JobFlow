import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import Card from "../components/ui/Card";
import Form from "../components/ui/Form";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";




export default function Register(){
    const [name, setName]= useState("")
    const [email, setEmail]= useState("")
    const [password, setPassword]= useState("")
    const [error, setError]= useState(null)

    const {register, loading}= useAuth()
    const navigate = useNavigate()

    async function handleSubmit(e){
        e.preventDefault()
        setError(null)

        try{
            await register(name, email, password)
            navigate("/login") //auto-login after registration
        }catch(err){
            setError(err.message || "Registration failed")
        }
    }

    
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <Card className="w-full max-w-md p-6">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-slate-900">
            Create your account
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Start tracking your placement journey.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 rounded bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Form */}
        <Form onSubmit={handleSubmit} noValidate>
          <Input
            label="Full name"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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
            placeholder="At least 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />

          <Button
            type="submit"
            className="w-full mt-2"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Create account"}
          </Button>
        </Form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:underline"
          >
            Sign in
          </Link>
        </div>
      </Card>
    </div>
  )
}