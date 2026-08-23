import {prisma} from "../../../../lib/prisma"
type StudentTouteProps={
    params: Promise<{id:string}>
}
export async function PATCH(
    request: Request,
    {params}: StudentRouteProps
){
    const {id}= await params
    const body=await request.json()
    const updatedStudent=await prisma.student.update({
        where:{
            id:Number(id),
        },
        data:{
            status:body.status,
        },
    })
    return Response.json(updatedStudent)
}
export async function DELETE(
    request:Request,
    {params}: StudentRouteProps
){
    const{id}=await params
    const deletedStudent=await prisma.student.delete({
        where:{
            id:Number(id),
        },
    })
    return Response.json(deletedStudent)
}