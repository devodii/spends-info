"use client"

import { ComponentProps, ReactNode } from "react"
import { DropzoneOptions, DropzoneState, useDropzone } from "react-dropzone"

interface Props extends DropzoneOptions {
  containerProps?: ComponentProps<"div">
  inputProps?: ComponentProps<"input">
  children: (state: DropzoneState) => ReactNode
}

export const Dropzone = ({ containerProps, inputProps, children, ...forwardedProps }: Props) => {
  const dropzoneState = useDropzone({ ...forwardedProps })

  return (
    <div {...containerProps} {...dropzoneState.getRootProps()}>
      <input {...dropzoneState.getInputProps(inputProps)} />
      {children(dropzoneState)}
    </div>
  )
}
