import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    console.log("Received messages:", messages)

    const result = await streamText({
      model: openai("gpt-4o-mini"),
      system: "You are a helpful AI assistant. Be concise and friendly in your responses.",
      messages,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("API Route Error:", error)
    return new Response(
      JSON.stringify({
        error: "Failed to process request",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}
