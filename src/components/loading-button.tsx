"use client"

import { cn } from "@/lib/utils"
import { Loader } from "lucide-react"
import { Button, ButtonProps } from "./ui/button"

interface Props extends Omit<ButtonProps, "children"> {
  text: string
  loading: boolean
}

export const LoadingButton = ({ text, loading, className, ...forwardedProps }: Props) => {
  return (
    <Button className={cn("flex items-center justify-center gap-2", className)} {...forwardedProps}>
      <span className="text-md font-medium">{text}</span>
      {loading && <Loader className="mr-2 size-4 animate-spin" />}
    </Button>
  )
}
