"use server"

import db from "@/lib/db"
import { openai } from "@/lib/openai"
import { summary, upload } from "@/lib/schema"
import { nanoid } from "nanoid"
import { zodResponseFormat } from "openai/helpers/zod"
import { makePrompt } from "./prompt"
import { responseSchema } from "./schema"
import { SummaryCompletionResponse } from "./types"

export const generateSummaryCompletion = async (
  data: string,
): Promise<SummaryCompletionResponse> => {
  try {
    const response = await openai.beta.chat.completions.parse({
      model: "gpt-4o-mini",
      messages: [
        { role: "user", content: "Please explain my transaction history to me" },
        { role: "assistant", content: makePrompt(data) },
      ],
      response_format: zodResponseFormat(responseSchema, "response_schema"),
    })

    const content = response.choices[0].message.parsed

    if (!content?.is_transaction_history) {
      return { success: false, error: "Invalid transaction history" }
    }

    return { success: true, content: response.choices[0].message.parsed! }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, error: error.message }
    }
    return { success: false, error: "An unexpected error occured" }
  }
}

export const postSummary = async (rich_text: string, upload_id: string) => {
  return db.insert(summary).values({ rich_text, upload_id, id: `su_${nanoid(6)}` })
}

export const postUpload = async (file_url: string, ip_address: string) => {
  return db
    .insert(upload)
    .values({ id: `up_${nanoid(6)}`, file_url, ip_address })
    .returning()
}
