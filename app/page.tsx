"use client";
import {useState} from "react";
import StatCard from "../components/StatCard";
export default function Home() {
    const [studentsCount, setStudentsCount] = useState(24);
    function handleAddStudent() {
        setStudentsCount(studentsCount + 1);
    }
    function handleRemoveStudent() {
        setStudentsCount(studentsCount - 1);
    }   
    return (
        <div>
        <div className="flex gap-4 justify-between">
            <StatCard
            title="Total Students"
            value={studentsCount}
            />
            <StatCard
            title="Teachers"
            value={12}
            />
            </div>
            <div> 
            <button onClick={handleAddStudent}>
  Add Student
</button>
<button onClick={handleRemoveStudent}>
    Remove Student
</button>
          </div>
          </div>
    )
}