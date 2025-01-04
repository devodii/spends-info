import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ComponentProps, ReactNode } from "react"

interface Props extends ComponentProps<typeof Dialog> {
  trigger: ComponentProps<typeof DialogTrigger>
  header: string
  description?: string
  content: ReactNode
}

export const DialogMix = ({ trigger, header, description, content, ...rootProps }: Props) => {
  return (
    <Dialog {...rootProps}>
      <DialogTrigger {...trigger} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">{header}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  )
}
