import { Spinner } from "@/components/spinner"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

const feedbackSchema = z.object({
  comment: z.string().trim().min(1, { message: "Required" }),
})

type FeedbackSchema = z.infer<typeof feedbackSchema>

export const SendFeedback = () => {
  const [open, setOpen] = useState(false)

  const { mutate, isPending } = useMutation({
    mutationFn: async (comment: string) => {
      const { data } = await axios.post("/api/feedback", { comment })
      return data as { success: boolean }
    },
    onSuccess: (response) => {
      setOpen(false)

      if (response.success) toast.success("Your feedback has been received")
      else toast.error("Something went wrong")
    },
  })

  const form = useForm<FeedbackSchema>({ resolver: zodResolver(feedbackSchema) })

  const onSubmit = (data: FeedbackSchema) => mutate(data.comment)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Share feedback</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Help us make v2 better</DialogTitle>
          <DialogDescription>
            What features would help you better understand your finance
          </DialogDescription>
        </DialogHeader>
        <form
          className="flex w-full flex-col items-center justify-center gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <Controller
            control={form.control}
            name="comment"
            render={({ field, fieldState: { error } }) => {
              return (
                <div className="grid w-full grid-cols-1 gap-2">
                  <Input {...field} className="w-full border" placeholder="I want to..." />
                  {error && <span className="text-sm text-red-500">{error.message}</span>}
                </div>
              )
            }}
          />
          <Button type="submit" className="w-full max-w-[300px] rounded-[100px]">
            <span>Submit</span>
            {isPending && <Spinner />}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
