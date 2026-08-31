import { prisma } from "../../../lib/prisma"
import { notFound } from "next/navigation"
import { createClient } from "../../../utils/supabase/server"
import StudentAIAnalysis from "../../../components/StudentAIAnalysis"
type StudentProfileProps = {
  params: Promise<{ id: string }>
}

export default async function StudentProfile({
  params,
}: StudentProfileProps) {
  const { id } = await params

  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    notFound()
  }

  const student = await prisma.student.findFirst({
    where: {
      id: Number(id),
      ownerId: user.id,
    },
  })

  if (!student) {
    notFound()
  }
  return (
    <div>
      <h1>Student Profile</h1>
      <p>{student.name}</p>
      <p>{student.email}</p>
      <p>{student.status}</p>
      <StudentAIAnalysis studentId={student.id} />
                </div>
  )
}