"use client";

import { Loader } from "lucide-react";
import { Button, ButtonProps } from "./ui/button";
import { cn } from "@/lib/utils";
import { useFormStatus } from "react-dom";

interface Props extends ButtonProps {
  text: string;
}

export const LoadingButton = ({
  children,
  className,
  ...forwardedProps
}: Props) => {
  const { pending } = useFormStatus();

  return (
    <Button
      className={cn("flex gap-2 items-center justify-center", className)}
      {...forwardedProps}
    >
      {pending && <Loader className="mr-2 size-4 animate-spin" />}
      <span className="text-md font-medium">{children}</span>
    </Button>
  );
};
