"use client"

import { Dropzone } from "@/components/dropzone"
import { LoadingButton } from "@/components/loading-button"
import { badgeVariants } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"

export default function Home() {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = () => {
    if (loading) return

    if (!file) {
      return void toast.info("Please upload a transaction history")
    }
    setLoading(true)
  }

  return (
    <div className="flex min-h-screen w-screen py-24">
      <div className="container flex flex-col items-center gap-4">
        <h4 className="text-center text-4xl font-semibold">Understand your transaction history</h4>

        <form className="flex flex-col gap-4" action={handleSubmit}>
          <Dropzone
            accept={{
              "application/pdf": [".pdf"],
            }}
            maxFiles={1}
            containerProps={{
              className: "h-[200px] w-full max-w-sm rounded-xl border p-8",
            }}
            multiple={false}
            onDrop={([file]) => setFile(file)}
          >
            {(state) => {
              const file = state.acceptedFiles[0]
              return (
                <div className="flex h-full w-full items-center justify-center gap-2">
                  {!state.isDragActive && !file && (
                    <p className="text-center">
                      Drag and drop files here, or click to select files
                    </p>
                  )}
                  {state.isDragActive && <p className="text-center">Drop the file here..</p>}

                  {file && (
                    <div className="w-full break-words text-center text-xl font-medium">
                      {file.name}
                    </div>
                  )}
                </div>
              )
            }}
          </Dropzone>

          <LoadingButton loading={loading} type="submit" text="Generate summary" />
        </form>

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
