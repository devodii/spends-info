import { ResponseSchema } from "./schema"

export type SummaryCompletionResponse =
  | { success: true; content: ResponseSchema }
  | { success: false; error: string }
