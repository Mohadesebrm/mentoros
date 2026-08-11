import Link from "next/link"
import { students } from "../../data/students"
export default function Students () {
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
                <Link href={`/students/${student.id}`}>
                View Profile 
                </Link>
                </div>
        ))}
        </div>
    );
}