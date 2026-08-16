"use client"
import {useState, useEffect} from "react"
import Link from "next/link"
export default function Students () {
  const [students,setStudents]=useState([])
  const [loading,setLoading]=useState(true)
  const [error,setError]=useState("")
  const[name,setName]=useState("")
  const[email,setEmail]=useState("")
  const [ status,setStatus]=useState("Active")
  async function loadStudents() {
    try{
    const response= await fetch("/api/students")
    if (!response.ok){
      throw new Error("Failed to fetch students")
    }
    const data = await response.json()
    setStudents(data)
    }catch {
      setError("Failed to load students")
    } finally{
    setLoading(false)
  }
  }
  useEffect(() => {
    loadStudents()
  }, [])
  if (loading){
    return <p>Loading students...</p>
  }
  if (error) {
    return <p>{error}</p>
  }
  async function handleAddStudent() {
    const response = await fetch("/api/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        status,
      }),
    })
  if (response.ok) {
    await loadStudents()
    setName("")
    setEmail("")
    setStatus("Active")
  }
  }
    return (
        <div className="flex flex-col gap-4">
        <h1>Students Page</h1>
        <input
        value={name}
        onChange={(event)=> setName(event.target.value)}
        placeholder="Student name"
        />
        <input
  value={email}
  onChange={(event) => setEmail(event.target.value)}
  placeholder="Student email"
/>
<select
value={status}
onChange={(event)=>setStatus(event.target.value)}
>
  <option value="Active">Active</option>
  <option value="Inactive">Inactive</option>
</select>
<button onClick={handleAddStudent}>
  Add Student
</button>
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