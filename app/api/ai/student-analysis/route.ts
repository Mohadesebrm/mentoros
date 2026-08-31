import { prisma } from "../../../../lib/prisma"
import { openai } from "../../../../lib/openai"
import { createClient } from "../../../../utils/supabase/server"
export async function POST(request: Request) {
    const body = await request.json()
    const { studentId, mentorNote } = body
    const supabase = await createClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
        return Response.json(
            { error: "Unauthorized" },
            { status: 401 }
        )
    }
    const student = await prisma.student.findFirst({
        where: {
          id: Number(studentId),
          ownerId: user.id,
        },
      })
      
      if (!student) {
        return Response.json(
          { error: "Student not found" },
          { status: 404 }
        )
      }
      const context = `
Student name: ${student.name}
Student status: ${student.status}
Mentor note: ${mentorNote}
`
const response = await openai.responses.create({
    model: "gpt-5.6-luna",
  
    instructions:
      "You are an assistant for mentors. Analyze the student's situation and recommend one immediate next action.",
  
    input: context,
  
    text: {
      format: {
        type: "json_schema",
        name: "student_analysis",
        strict: true,
  
        schema: {
          type: "object",
  
          properties: {
            risk: {
              type: "string",
              enum: ["LOW", "MEDIUM", "HIGH"],
            },
  
            nextAction: {
              type: "string",
            },
  
            reason: {
              type: "string",
            },
          },
  
          required: ["risk", "nextAction", "reason"],
          additionalProperties: false,
        },
      },
    },
  })
  const result = JSON.parse(response.output_text)

return Response.json({
  result,
})
}