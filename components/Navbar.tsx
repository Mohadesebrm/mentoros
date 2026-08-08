import Link from "next/link";
export default function Navbar() {
    return(
        <div className="flex justify-between gap-4 p-4 border-b shadow-md">
              <Link href="/">MentorOS</Link>
            <div className="flex gap-4">
            <Link href="/students">Students</Link>
            <Link href="/teachers">Teachers</Link>
            </div>
        </div>
    );
}