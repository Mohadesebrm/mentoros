import {prisma}from "../../../lib/prisma"
import {Prisma} from "../../../generated/prisma/client"
import { createClient } from "../../../utils/supabase/server"
export async function GET() {
const supabase=await createClient()
const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return Response.json(
      { message: "Unauthorized" },
      { status: 401 }
    )
  }

  const students = await prisma.student.findMany({
    where: {
      ownerId: user.id,
    },
  })

  return Response.json(students)
}
export async function POST (request:Request) {
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
    const body= await request.json()
    if (!body.name || !body.email){
        return Response.json(
            {message: "Name and email are required"},
            {status:400}
        )
    }
    try{
    const newStudent=await prisma.student.create({
        data:{
            name:body.name,
            email:body.email,
            status: body.status==="Inactive"?"INACTIVE":"ACTIVE",
            ownerId: user.id,
        },
    })
    return Response.json(newStudent, {status:201})
} catch(error) {
    if (
        error instanceof Prisma.PrismaClientKnownRequestError&&
        error.code==="P2002"
    ) {
        return Response.json(
            {message: "A student with this email already exists"},
            {status:409}
        )
    }
    return Response.json(
        {message:"Something went wrong"},
        {status:500}
    )
}
}
