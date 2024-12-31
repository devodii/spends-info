"use client"

import { cn } from "@/lib/utils"
import { Loader } from "lucide-react"
import { useFormStatus } from "react-dom"
import { Button, ButtonProps } from "./ui/button"

interface Props extends Omit<ButtonProps, "children"> {
  text: string
}

export const LoadingButton = ({ text, className, ...forwardedProps }: Props) => {
  const { pending } = useFormStatus()

  return (
    <Button className={cn("flex items-center justify-center gap-2", className)} {...forwardedProps}>
      {pending && <Loader className="mr-2 size-4 animate-spin" />}
      <span className="text-md font-medium">{text}</span>
    </Button>
  )
}
