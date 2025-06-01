import { generateSummaryCompletion, postSummary } from "@/app/actions"
import { pdfToText } from "@/lib/file"
import { NextRequest, NextResponse } from "next/server"

export const runtime = "nodejs"

export const POST = async (req: NextRequest) => {
  console.log("hit")
  const payload = (await req.json()) as { fileUrl: string }
  const pdfText = await pdfToText(payload.fileUrl)
  const summary = await generateSummaryCompletion(pdfText)

  if (summary.success) {
    await postSummary(JSON.stringify(summary.content), payload.fileUrl)
  }

  return NextResponse.json(summary)
}

export const GET = () => {
  return NextResponse.json({ message: "Hello world" })
}
