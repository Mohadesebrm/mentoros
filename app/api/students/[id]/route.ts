import {prisma} from "../../../../lib/prisma"
import { createClient } from "../../../../utils/supabase/server"
type StudentTouteProps={
    params: Promise<{id:string}>
}
export async function PATCH(
    request: Request,
    { params }: StudentTouteProps
  ) {
    const { id } = await params
  
    const supabase = await createClient()
  
    const {
      data: { user },
    } = await supabase.auth.getUser()
  
    if (!user) {
      return Response.json(
        { message: "Unauthorized" },
        { status: 401 }
      )
    }
  
    const student = await prisma.student.findFirst({
      where: {
        id: Number(id),
        ownerId: user.id,
      },
    })
  
    if (!student) {
      return Response.json(
        { message: "Student not found" },
        { status: 404 }
      )
    }
  
    const body = await request.json()
  
    const updatedStudent = await prisma.student.update({
      where: {
        id: Number(id),
      },
      data: {
        status: body.status,
      },
    })
  
    return Response.json(updatedStudent)
  }
  export async function DELETE(
    request: Request,
    { params }: StudentRouteProps
  ) {
    const { id } = await params
  
    const supabase = await createClient()
  
    const {
      data: { user },
    } = await supabase.auth.getUser()
  
    if (!user) {
      return Response.json(
        { message: "Unauthorized" },
        { status: 401 }
      )
    }
  
    const student = await prisma.student.findFirst({
      where: {
        id: Number(id),
        ownerId: user.id,
      },
    })
  
    if (!student) {
      return Response.json(
        { message: "Student not found" },
        { status: 404 }
      )
    }
  
    const deletedStudent = await prisma.student.delete({
      where: {
        id: Number(id),
      },
    })
  
    return Response.json(deletedStudent)
  }