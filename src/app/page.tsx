"use client"

import { FileUploader } from "@/components/file-uploader"
import { LoadingButton } from "@/components/loading-button"
import { SendFeedback } from "@/components/send-feedback"
import { badgeVariants } from "@/components/ui/badge"
import { useUploadFile } from "@/hooks/use-upload-file"
import { cn } from "@/lib/utils"
import axios, { AxiosResponse } from "axios"
import Link from "next/link"
import { useActionState, useState } from "react"
import Markdown from "react-markdown"
import { toast } from "sonner"
import { ResponseSchema } from "./schema"
import { SummaryCompletionResponse } from "./types"

const markdownStyles = `flex flex-col gap-2 w-full max-w-2xl [&>_h1]:text-[27px] [&>_h1]:font-semibold [&>_h2]:text-[24px] [&>_h2]:font-semibold [&>h3]:text-[20px] [&>h3]:font-semibold [&>h4]:text-[18px] [&>h4]:font-semibold`

export const runtime = "nodejs"

export default function Home() {
  const { onUpload, progresses, isUploading, uploadResult } = useUploadFile("pdf", {
    defaultUploadedFiles: [],
  })

  const [summary, setSummary] = useState<ResponseSchema | null>(null)

  const fileUploadUrl = uploadResult?.url

  const [, formAction] = useActionState(async () => {
    try {
      if (!fileUploadUrl) throw new Error("Failed to upload file")

      const { data: summary } = await axios.post<
        any,
        AxiosResponse<SummaryCompletionResponse, any>
      >(`${process.env.NEXT_PUBLIC_APP_URL}/api/analyze`, { fileUrl: fileUploadUrl })

      if ("content" in summary) setSummary(summary.content)

      if ("error" in summary) throw new Error(summary.error)
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("Something went wrong")
      }
    }
  }, null)

  return (
    <div className="flex min-h-screen w-screen items-center justify-center py-24">
      <div className="container mx-auto flex flex-col items-center gap-4">
        <h4 className="text-center text-4xl font-semibold">Understand your transaction history</h4>
        <p>Upload PDF files from your bank.</p>

        <FileUploader
          accept={{ "application/pdf": [".pdf"] }}
          maxFileCount={1}
          maxSize={1024 * 1024 * 1} // 1MB
          progresses={progresses}
          onUpload={onUpload}
          disabled={isUploading}
        />

        {fileUploadUrl && (
          <form action={formAction} className="mt-6">
            <LoadingButton
              text="Analyze"
              className="w-full max-w-[300px] rounded-[100px]"
              type="submit"
            />
          </form>
        )}

        {summary && (
          <div className="max mx-4 flex w-full flex-col items-center justify-center gap-4">
            <Markdown className={markdownStyles}>{summary.summary}</Markdown>
            <Markdown className={markdownStyles}>{summary.recommendations}</Markdown>
            <Markdown className={markdownStyles}>{summary.top_recipents}</Markdown>
          </div>
        )}

        <SendFeedback />

        <Link
          className={cn(
            badgeVariants({
              className:
                "fixed bottom-4 right-4 rounded-lg bg-red-500 font-semibold text-white hover:bg-red-500",
            }),
          )}
          target="_blank"
          href="https://medium.com/@emmanuelodii80/spends-info-lifetime-updates-1829db5a36d5"
        >
          📖 Read the book
        </Link>
      </div>
    </div>
  )
}
