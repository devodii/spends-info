import { Dropzone } from "@/components/dropzone"

export default function Home() {
  return (
    <div className="flex min-h-screen w-screen py-24">
      <div className="jus container flex flex-col items-center gap-4">
        <h2 className="text-center text-3xl font-semibold md:text-5xl">
          Understand Your Transaction History
        </h2>

        <Dropzone
          accept={{
            "application/pdf": [".pdf"],
          }}
        />
      </div>
    </div>
  )
}
