"use client"
import { useState } from "react"
type StudentAIAnalysisProps = {
  studentId: number
}
type AnalysisResult = {
  risk: "LOW" | "MEDIUM" | "HIGH"
  nextAction: string
  reason: string
}
export default function StudentAIAnalysis({
  studentId,
}: StudentAIAnalysisProps) {
  const [mentorNote, setMentorNote] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState("")
  async function handleAnalyze() {
    setLoading(true)
    setResult(null)
  setError("")
    try {
      const response = await fetch("/api/ai/student-analysis", {
        method: "POST",
  
        headers: {
          "Content-Type": "application/json",
        },
  
        body: JSON.stringify({
          studentId,
          mentorNote,
        }),
      })
      const data = await response.json()
      if (!response.ok) {
        setError(data.error || "Something went wrong")
        return
      }
      setResult(data.result)
    }
      catch {
        setError("Could not analyze the student. Please try again.")
    } finally {
      setLoading(false)
    }
  }
  return (
    <div>
      <textarea
        value={mentorNote}
        onChange={(event) => setMentorNote(event.target.value)}
        placeholder="Write a note about this student..."
      />
      <button
        onClick={handleAnalyze}
        disabled={loading || !mentorNote.trim()}
      >
        {loading ? "Analyzing..." : "Analyze Student"}
      </button>
      {error && (
  <p>{error}</p>
)}
      {result && (
        <div>
          <p>Risk: {result.risk}</p>
          <p>Next Action: {result.nextAction}</p>
          <p>Reason: {result.reason}</p>
        </div>
      )}
    </div>
  )
  }