type StudentProfileProps={
    params: Promise<{id:string}>
}
const students=[
    {id:1, name:"Mohadese"},
    {id:2, name:"Sam"},
    {id:3, 
        name:"Sara",
    email:"sara@gmail.com",
status:"Active"
}
]
export default async function StudentProfile({params} : StudentProfileProps) {
    const {id} = await params
    const student= students.find((student) =>
    student.id===Number(id)
)
    return(
        <div>
            <h1> Student Profile</h1>
            <p>{student?.name}</p>
            <p>{student?.email}</p>
            <p>{student?.status}</p>
        </div>
    )
}