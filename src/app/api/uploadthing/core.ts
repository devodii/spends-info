import { postUpload } from "@/app/actions"
import { createUploadthing, type FileRouter } from "uploadthing/next"

const f = createUploadthing()

export const ourFileRouter = {
  pdf: f(["pdf"])
    .middleware(async ({ req }) => {
      const ipAddress = req.headers.get("x-forwarded-for") as string
      return { ipAddress }
    })
    .onUploadComplete(async ({ file, metadata }) => {
      const response = await postUpload(file.url, metadata.ipAddress)
      return { url: file.url, id: response[0].id }
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
