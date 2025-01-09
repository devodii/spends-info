import * as React from "react"
import { toast } from "sonner"
import type { AnyFileRoute, UploadFilesOptions } from "uploadthing/types"
import { type ClientUploadedFileData } from "uploadthing/types"

import { type OurFileRouter } from "@/app/api/uploadthing/core"
import { uploadFiles } from "@/lib/uploadthing"

interface UseUploadFileOptions<TFileRoute extends AnyFileRoute>
  extends Pick<
    UploadFilesOptions<TFileRoute>,
    "headers" | "onUploadBegin" | "onUploadProgress" | "skipPolling"
  > {
  defaultUploadedFiles?: ClientUploadedFileData<unknown>[]
}

export function useUploadFile(
  endpoint: keyof OurFileRouter,
  forwardedProps: UseUploadFileOptions<OurFileRouter[keyof OurFileRouter]> = {},
) {
  const [progresses, setProgresses] = React.useState<Record<string, number>>({})
  const [isUploading, setIsUploading] = React.useState(false)
  const [uploadResult, setUploadResult] = React.useState<{ url: string; id: string } | null>(null)

  async function onUpload(files: File[]) {
    setIsUploading(true)
    try {
      const res = await uploadFiles(endpoint, {
        ...forwardedProps,
        files,
        onUploadProgress: ({ file, progress }) => {
          setProgresses((prev) => {
            return {
              ...prev,
              [file.name]: progress,
            }
          })
        },
      })
      setUploadResult({ url: res[0].url, id: res[0].serverData.id })
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message)
      } else {
        toast.error("Something went wrong")
      }
    } finally {
      setProgresses({})
      setIsUploading(false)
    }
  }

  return {
    onUpload,
    progresses,
    isUploading,
    uploadResult,
  }
}
