import { openai } from "../../../../lib/openai"

export async function GET() {
  const response = await openai.responses.create({
    model: "gpt-5",

    instructions:
      "You are an assistant for mentors. Analyze the student's situation and recommend one immediate next action.",

    input: `
Student: Sara
Goal: IELTS score 7
Current score: 6
Homework completion: 35%
Exam: 3 weeks away
Last mentor follow-up: 12 days ago
`,

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

  return Response.json({
    result: JSON.parse(response.output_text),
  })
}