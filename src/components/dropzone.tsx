"use client"

import { useCallback } from "react"
import { DropzoneOptions, useDropzone } from "react-dropzone"

export const Dropzone = ({ ...forwardedProps }: DropzoneOptions) => {
  console.log("re-rendered")

  // todo: upload to supabase
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    const reader = new FileReader()
    reader.onabort = () => console.log("file reading was aborted")
    reader.onerror = () => console.log("file reading has failed")
    reader.onload = () => {
      const binaryStr = reader.result
      console.log(binaryStr)
    }
    reader.readAsArrayBuffer(file)
  }, [])

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    ...forwardedProps,
    onDrop,
  })

  return (
    <div {...getRootProps()} className="h-[200px] w-full max-w-sm rounded-xl border p-8">
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag and drop files here, or click to select files</p>
      )}

      {JSON.stringify(acceptedFiles)}
    </div>
  )
}
