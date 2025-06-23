"use client"

import { Loader2 } from "lucide-react"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"

interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
  loading?: boolean
}

export function LoadingButton({
  children,
  isLoading,
  loading,
  className,
  ...props
}: LoadingButtonProps) {
  const isButtonLoading = isLoading || loading

  return (
    <Button
      className={cn("button-86", className)}
      disabled={isButtonLoading}
      {...props}
    >
      {isButtonLoading ? (
        <>
          <Loader2 className="animate-spin mr-2" />
          Loading...
        </>
      ) : (
        children
      )}
    </Button>
  )
}
