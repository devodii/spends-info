"use server"

import { openai } from "@/lib/openai"
import { zodResponseFormat } from "openai/helpers/zod"
import { makePrompt } from "./prompt"
import { responseSchema } from "./schema"

export const generateSummaryCompletion = async (data: string) => {
  try {
    const response = await openai.beta.chat.completions.parse({
      model: "gpt-4o-mini",
      messages: [
        { role: "user", content: "Please explain my transaction history to me" },
        { role: "assistant", content: makePrompt(data) },
      ],
      response_format: zodResponseFormat(responseSchema, "response_schema"),
    })

    return response.choices[0].message.parsed
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}
