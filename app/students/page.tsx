export default function Students () {
    const students=[
    {
       id:1,
        name: "Mohadese",
        email:"Mohadese@example.com",
        status:"Active"
    },
    {
        id:2,
        name:"Sam",
        email:"samsamaii@gmail.com",
        status:"Inactive"
    },
    {
        id:3,
        name:"sara",
        email:"Sara@gmail.com",
        status:"Active"
    },
    ];
    return (
        <div className="flex flex-col gap-4">
        <h1>Students Page</h1>
        {students.map((student)=>(
            <div key={student.id} className="border p-4 rounded">
              <p className="font-bold">{student.name}</p>
              <p className="text-sm">{student.email}</p>
              <p
              className={
                student.status==="Active"
                ?"inline-block bg-green-100 text-green-600 font-bold px-2 py-1 rounded"
                :"inline-block bg-gray-200 text-gray-500 text-sm px-2 py-1 rounded"
              }
              >
                {student.status}
                </p>
                </div>
        ))}
        </div>
    );
}