import { prisma } from "../../../lib/prisma"
import {notFound} from "next/navigation"
type StudentProfileProps={
    params: Promise<{id:string}>
}
export default async function StudentProfile({params} : StudentProfileProps) {
    const {id} = await params
    const student = await prisma.student.findUnique({
        where:{
            id:Number(id),
        },
    })
    if (!student){
        notFound()
    }
    return(
        <div>
            <h1> Student Profile</h1>
            <p>{student.name}</p>
            <p>{student.email}</p>
            <p>{student.status}</p>
        </div>
    )
}