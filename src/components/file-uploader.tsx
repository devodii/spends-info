"use client"

import { FileText, Upload, X } from "lucide-react"
import Image from "next/image"
import * as React from "react"
import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useControllableState } from "@/hooks/use-controllable-state"
import { cn, formatBytes } from "@/lib/utils"

interface FileWithMetadata extends File {
  isRemovable?: boolean
  preview?: string
}

interface FileUploaderProps {
  onFileSelect: (file: File) => void
}

export function FileUploader({ onFileSelect }: FileUploaderProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0]
        setSelectedFile(file)
        onFileSelect(file)
      }
    },
    [onFileSelect]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    multiple: false
  })

  const removeFile = () => {
    setSelectedFile(null)
    onFileSelect(null as any)
  }

  return (
    <div className="space-y-4 rounded-lg p-6">
      {selectedFile ? (
        <div className="border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-[var(--text-primary)]" />
              <div>
                <p className="text-sm font-medium text-[var(--text-primary)]">{selectedFile.name}</p>
                <p className="text-xs text-[var(--text-secondary)]">{formatBytes(selectedFile.size)}</p>
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={removeFile}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Remove file</span>
            </Button>
          </div>
        </div>
      ) : (
          <div
            {...getRootProps()}
          className="border-2 border-dashed border-[var(--card-border)] rounded-lg p-8 text-center cursor-pointer hover:border-[var(--text-primary)] transition-colors"
          >
            <input {...getInputProps()} />
          <Upload className="mx-auto h-12 w-12 text-accent mb-4" />
            {isDragActive ? (
            <p className="text-[var(--text-primary)]">Drop the PDF file here...</p>
          ) : (
            <div className="space-y-2">
              <p className="text-[var(--text-primary)]">
                Drag and drop your PDF file here, or click to select
              </p>
              <span className="text-accent">Only PDF files are accepted</span>
              </div>
            )}
          </div>
        )}
    </div>
  )
}

interface FileCardProps {
  file: File
  onRemove: () => void
  progress?: number
  isRemovable?: boolean
}

const FileCard = ({ file, progress, onRemove, isRemovable = true }: FileCardProps) => {
  return (
    <div className="relative flex items-center gap-2.5">
      <div className="flex flex-1 gap-2.5">
        {isFileWithPreview(file) ? <FilePreview file={file} /> : null}
        <div className="flex w-full flex-col gap-2">
          <div className="flex flex-col gap-px">
            <p className="line-clamp-1 text-sm font-medium text-foreground/80">{file.name}</p>
            <p className="text-xs text-muted-foreground">{formatBytes(file.size)}</p>
          </div>
          {progress ? <Progress value={progress} /> : null}
        </div>
      </div>
      {isRemovable && (
        <div className="flex items-center gap-2">
          <Button type="button" variant="outline" size="icon" className="size-7" onClick={onRemove}>
            <X className="size-4" aria-hidden="true" />
            <span className="sr-only">Remove file</span>
          </Button>
        </div>
      )}
    </div>
  )
}

function isFileWithPreview(file: File): file is File & { preview: string } {
  return "preview" in file && typeof file.preview === "string"
}

interface FilePreviewProps {
  file: File & { preview: string }
}

function FilePreview({ file }: FilePreviewProps) {
  if (file.type.startsWith("image/")) {
    return (
      <Image
        src={file.preview}
        alt={file.name}
        width={48}
        height={48}
        loading="lazy"
        className="aspect-square shrink-0 rounded-md object-cover"
      />
    )
  }

  return <FileText className="size-10 text-muted-foreground" aria-hidden="true" />
}
