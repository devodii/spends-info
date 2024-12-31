import { LoadingButton } from "@/components/loading-button"

export default function Home() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <LoadingButton text="Start" />
      <h2 className="text-center text-3xl font-semibold md:text-5xl">
        Understand Your Transaction History
      </h2>
    </div>
  )
}
