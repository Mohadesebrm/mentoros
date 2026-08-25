import type { ReactNode } from "react"
import { redirect } from "next/navigation"
import { createClient } from "../../utils/supabase/server"

type StudentsLayoutProps = {
  children: ReactNode
}

export default async function StudentsLayout({
  children,
}: StudentsLayoutProps) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  return <>{children}</>
}