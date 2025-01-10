"use client"

import { FileUploader } from "@/components/file-uploader"
import { LoadingButton } from "@/components/loading-button"
import { badgeVariants } from "@/components/ui/badge"
import { useUploadFile } from "@/hooks/use-upload-file"
import { absoluteUrl, cn } from "@/lib/utils"
import Link from "next/link"
import { useActionState, useState } from "react"
import Markdown from "react-markdown"
import { toast } from "sonner"
import { generateSummaryCompletion, putSummary } from "./actions"
import { ResponseSchema } from "./schema"

const markdownStyles = `flex flex-col gap-2 w-full max-w-2xl [&>_h1]:text-[27px] [&>_h1]:font-semibold [&>_h2]:text-[24px] [&>_h2]:font-semibold [&>h3]:text-[20px] [&>h3]:font-semibold [&>h4]:text-[18px] [&>h4]:font-semibold`

export default function Home() {
  const { onUpload, progresses, isUploading, uploadResult } = useUploadFile("pdf", {
    defaultUploadedFiles: [],
  })

  const [summary, setSummary] = useState<ResponseSchema | null>(null)

  const [, formAction] = useActionState(async () => {
    try {
      const res = await fetch(absoluteUrl(`/api/py?url=${uploadResult?.url}`), {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
      const data = await res.text()

      const summary = await generateSummaryCompletion(JSON.stringify(data))

      if ("content" in summary) {
        setSummary(summary.content)
      }

      if ("error" in summary) {
        toast.error(summary.error)
      }

      if (uploadResult) {
        await putSummary(JSON.stringify(summary), uploadResult.id)
      }
    } catch (error) {
      console.log({ error })
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

        {uploadResult?.url && (
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
