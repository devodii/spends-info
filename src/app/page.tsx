"use client"

import { DialogMix } from "@/components/dialog-mix"
import { FileUploader } from "@/components/file-uploader"
import { LoadingButton } from "@/components/loading-button"
import { badgeVariants } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useUploadFile } from "@/hooks/use-upload-file"
import { absoluteUrl, cn } from "@/lib/utils"
import Link from "next/link"
import { useActionState, useState } from "react"
import { CiBank } from "react-icons/ci"
import Markdown from "react-markdown"
import { toast } from "sonner"
import { generateSummaryCompletion } from "./actions"
import { ResponseSchema } from "./schema"

const markdownStyles = `flex flex-col gap-2 w-full max-w-2xl [&>_h1]:text-[27px] [&>_h1]:font-semibold [&>_h2]:text-[24px] [&>_h2]:font-semibold [&>h3]:text-[20px] [&>h3]:font-semibold [&>h4]:text-[18px] [&>h4]:font-semibold`

type SummaryState = "idle" | "parsing" | "generating"

const getCTA = (state: SummaryState) => {
  switch (state) {
    case "generating":
      return "Processing by assistant"
    case "parsing":
      return "Parsing document"
    case "idle":
      return "Generate summary"
  }
}

export default function Home() {
  const { onUpload, progresses, isUploading, uploadResult } = useUploadFile("pdf", {
    defaultUploadedFiles: [],
  })

  const [state, setState] = useState<SummaryState>("idle")

  const [summary, setSummary] = useState<ResponseSchema | null>(null)

  const [, formAction] = useActionState(async () => {
    try {
      setTimeout(() => setState("parsing"), 100)

      const res = await fetch(absoluteUrl(`/api/py?url=${uploadResult?.url}`), {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
      const data = await res.json()

      setState("generating")

      const summary = await generateSummaryCompletion(JSON.stringify(data))
      setSummary(summary!)
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
      toast.error("Something went wrong.")
    } finally {
      setState("idle")
    }
  }, null)

  return (
    <div className="flex min-h-screen w-screen py-24">
      <header className="fixed left-0 right-0 top-0 flex flex-col items-center justify-center gap-2">
        <div className="w-full bg-[#16182A] px-4 py-1 text-center text-sm text-white">
          Click the `suggest bank` button if it is not available for your bank
        </div>
        <div className="flex w-full items-center justify-end px-4 md:px-12">
          <DialogMix
            trigger={{
              children: (
                <Button className="flex items-center justify-center gap-1 self-end bg-red-500 text-white hover:bg-red-500/90">
                  <CiBank size={20} /> <span className="font-semibold">Suggest Bank</span>
                </Button>
              ),
            }}
            header="Help us build integrations for your bank"
            content={
              <form
                action={(formdata) => {
                  console.log({ formdata })
                }}
                className="flex flex-col items-center justify-center gap-6"
              >
                <div className="flex w-full flex-col gap-2">
                  <Label>Bank Name</Label>
                  <Input name="bankName" className="border" />
                </div>

                <div className="flex w-full flex-col gap-2">
                  <Label>Transaction History Sample (PDF)</Label>
                  <Input name="historySample" className="border" />
                </div>

                <LoadingButton
                  className="w-full max-w-[300px] rounded-[100px]"
                  type="submit"
                  text="Submit"
                />
              </form>
            }
          />
        </div>
      </header>

      <div className="container flex flex-col items-center gap-4">
        <h4 className="text-center text-4xl font-semibold">Understand your transaction history</h4>
        <p>Only supports PDF files from Palmpay and Opay.</p>

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
              text={getCTA(state)}
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
          href="https://medium.com/@emmanuelodii80"
        >
          📖 Read the book
        </Link>
      </div>
    </div>
  )
}
