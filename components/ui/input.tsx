import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

function Input({ className, label, error, helperText, id, ...props }: InputProps) {
  const generatedId = React.useId()
  const inputId = id ?? generatedId
  const descriptionId = error || helperText ? `${inputId}-description` : undefined

  return (
    <div className="w-full">
      {label && <label htmlFor={inputId} className="mb-2 block text-sm font-medium text-muted-foreground">{label}</label>}
      <input
        id={inputId}
        aria-invalid={Boolean(error)}
        aria-describedby={descriptionId}
        className={cn(
          "flex h-10 w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none placeholder:text-zinc-500 focus:border-zinc-700 focus:ring-2 focus:ring-zinc-700 disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-destructive focus:ring-destructive",
          className
        )}
        {...props}
      />
      {(error || helperText) && (
        <p id={descriptionId} className={cn("mt-1 text-sm text-zinc-500", error && "text-destructive")}>
          {error ?? helperText}
        </p>
      )}
    </div>
  )
}

export { Input }
