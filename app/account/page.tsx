import { createClient } from "../../utils/supabase/server"
import LogoutButton from "../../components/LogoutButton"
import { redirect } from "next/navigation"
export default async function AccountPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
if (!user) {
    redirect("/login")
}
  return (
    <div>
      <h1>Account</h1>
      <p>{user.email}</p>
      <LogoutButton/>
    </div>
  )
}