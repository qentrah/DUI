import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const inputVariants = cva(
  "input flex h-10 w-full rounded-xl border bg-surface px-4 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground transition-all disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "border-border shadow-md hover:bg-surface-secondary focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/20",
        secondary: "border-transparent bg-transparent shadow-none hover:bg-accent/10 focus-visible:bg-accent/20 focus-visible:ring-2 focus-visible:ring-accent/20",
      },
    },
    defaultVariants: { variant: "primary" },
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "color">,
    VariantProps<typeof inputVariants> {
  /** Label for the input */
  label?: string
  /** Error message to display */
  error?: string
  /** Helper text to display below input */
  helperText?: string
  /** Whether the input should take full width of its container */
  fullWidth?: boolean
}

function Input({
  className,
  variant,
  label,
  error,
  helperText,
  fullWidth,
  id,
  ...props
}: InputProps) {
  const generatedId = React.useId()
  const inputId = id ?? generatedId
  const descriptionId = error || helperText ? `${inputId}-description` : undefined

  return (
    <div className={cn("flex flex-col gap-2", fullWidth && "w-full")}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-muted-foreground">
          {label}
        </label>
      )}
      <input
        id={inputId}
        aria-invalid={Boolean(error)}
        aria-describedby={descriptionId}
        className={cn(inputVariants({ variant }), error && "border-destructive bg-destructive/10 text-destructive", className)}
        data-invalid={Boolean(error) || undefined}
        {...props}
      />
      {(error || helperText) && (
        <p id={descriptionId} className={cn("text-sm text-muted-foreground", error && "text-destructive")}>
          {error ?? helperText}
        </p>
      )}
    </div>
  )
}

Input.displayName = "Input"

export { Input, inputVariants }