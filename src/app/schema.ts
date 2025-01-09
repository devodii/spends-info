import { z } from "zod"

export const responseSchema = z.object({
  summary: z.string(),
  recommendations: z.string(),
  top_recipents: z.string(),
  is_transaction_history: z.boolean(),
})

export type ResponseSchema = z.infer<typeof responseSchema>
