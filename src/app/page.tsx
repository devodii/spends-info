"use client"

import { FileUploader } from "@/components/file-uploader"
import { badgeVariants } from "@/components/ui/badge"
import { useUploadFile } from "@/hooks/use-upload-file"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default function Home() {
  const { onUpload, progresses, isUploading } = useUploadFile("pdf", {
    defaultUploadedFiles: [],
  })

  return (
    <div className="flex min-h-screen w-screen py-24">
      <div className="container flex flex-col items-center gap-4">
        <h4 className="text-center text-4xl font-semibold">Understand your transaction history</h4>

        <FileUploader
          accept={{ "application/pdf": [".pdf"] }}
          maxFileCount={1}
          maxSize={1024 * 1024 * 1} // 1MB
          progresses={progresses}
          onUpload={onUpload}
          disabled={isUploading}
        />

        {/* <UploadDropzone
          endpoint="pdf"
          onClientUploadComplete={(res) => {
            console.log("Files: ", res)
            toast.success("Successfully uploaded")
          }}
          onUploadError={(error: Error) => {
            console.log({ error })
            toast.error("Something went wrong")
          }}
        /> */}

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
