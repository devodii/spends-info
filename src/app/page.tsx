import { Dropzone } from "@/components/dropzone"
import { badgeVariants } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex min-h-screen w-screen py-24">
      <div className="container flex flex-col items-center gap-4">
        <h4 className="text-center text-4xl font-semibold">Understand your transaction history</h4>

        <Dropzone
          accept={{
            "application/pdf": [".pdf"],
          }}
        />
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
