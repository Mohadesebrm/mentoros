"use client"

import { createClient } from "../utils/supabase/client"

export default function LogoutButton() {
  async function handleLogout() {
    const supabase = createClient()

    await supabase.auth.signOut({ scope: "local" })

    window.location.href = "/login"
  }

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  )
}
