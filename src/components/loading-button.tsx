import { cn } from "@/lib/utils"
import { useFormStatus } from "react-dom"
import { Spinner } from "./spinner"
import { Button, ButtonProps } from "./ui/button"

interface Props extends Omit<ButtonProps, "children"> {
  text: string
}
export const LoadingButton = ({ text, className, ...forwardedProps }: Props) => {
  const { pending } = useFormStatus()

  return (
    <Button {...forwardedProps} className={cn("flex items-center gap-2", className)}>
      <span className="font-semibold">{text}</span>
      {pending && <Spinner />}
    </Button>
  )
}
