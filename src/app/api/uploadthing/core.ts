import { createUploadthing, type FileRouter } from "uploadthing/next"

const f = createUploadthing()

export const ourFileRouter = {
  pdf: f(["pdf"])
    .middleware(async () => await Promise.resolve({ state: true }))
    .onUploadComplete(async ({ file, metadata }) => {
      console.log({ state: metadata.state, url: file.url })

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { url: file.url }
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
