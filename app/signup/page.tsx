"use client"

import { useState } from "react"
import { createClient } from "../../utils/supabase/client"
export default function SignupPage() {
    const [message, setMessage] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  async function handleSignup() {
    const supabase = createClient()
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    if (error) {
        setMessage(error.message)
        return
      }
    
      setMessage("Account created successfully")
  }
  return (
    <div>
      <h1>Sign Up</h1>
      {message && <p>{message}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
  <button onClick={handleSignup}>
  Sign Up
</button>
    </div>
  )
}