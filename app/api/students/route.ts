import {prisma}from "../../../lib/prisma"
import {students} from "../../../data/students"
export async function GET() {
    const students= await prisma.student.findMany()
return Response.json(students)
}
export async function POST (request:Request) {
    const body= await request.json()
    if (!body.name || !body.email){
        return Response.json(
            {message: "Name and email are required"},
            {status:400}
        )
    }
    const newStudent=await prisma.student.create({
        data:{
            name:body.name,
            email:body.email,
            status: body.status==="Inactive"?"INACTIVE":"ACTIVE",
        },
    })
    return Response.json(newStudent, {status:201})
}