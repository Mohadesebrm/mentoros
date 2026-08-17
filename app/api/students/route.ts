import {students} from "../../../data/students"
export async function GET() {
    return Response.json (students)
}
export async function POST (request:Request) {
    const body= await request.json()
    if (!body.name || !body.email){
        return Response.json(
            {message: "Name and email are required"},
            {status:400}
        )
    }
    const newStudent={
        id: students.length+1,
        name: body.name,
        email:body.email,
        status: body.status
    }
    students.push(newStudent)
    return Response.json(newStudent, {status:201})
}