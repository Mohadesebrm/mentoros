"use client"

import { useState } from "react"
import { createClient } from "../../utils/supabase/client"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  async function handleLogin() {
    const supabase = createClient()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setMessage(error.message)
      return
    }

    setMessage("Logged in successfully")
  }

  return (
    <div>
      <h1>Login</h1>

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

      <button onClick={handleLogin}>
        Login
      </button>
    </div>
  )
}