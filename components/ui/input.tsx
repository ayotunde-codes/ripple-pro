"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  disableSearch?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, disableSearch, ...props }, ref) => {
  // Create a stable ref for the input element
  const inputRef = React.useRef<HTMLInputElement>(null)

  // Combine the forwarded ref with our internal ref
  React.useImperativeHandle(ref, () => inputRef.current!)

  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-input-dark dark:bg-[#0E0E0E] dark:text-foreground-dark dark:placeholder:text-[#A9A9A9] dark:focus-visible:ring-ring-dark dark:focus-visible:ring-offset-background-dark",
        className,
      )}
      ref={inputRef}
      autoComplete="off"
      data-disable-search={props["data-disable-search"] || undefined}
      {...props}
    />
  )
})
Input.displayName = "Input"

export { Input }
