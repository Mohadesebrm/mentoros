import {prisma}from "../../../lib/prisma"
import {Prisma} from "../../../generated/prisma/client"
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
    try{
    const newStudent=await prisma.student.create({
        data:{
            name:body.name,
            email:body.email,
            status: body.status==="Inactive"?"INACTIVE":"ACTIVE",
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
