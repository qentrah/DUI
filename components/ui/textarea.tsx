import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const textareaVariants = cva(
  "textarea flex min-h-24 w-full rounded-xl border bg-surface px-4 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground transition-all disabled:cursor-not-allowed disabled:opacity-50",
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

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "color">,
    VariantProps<typeof textareaVariants> {
  /** Label for the textarea */
  label?: string
  /** Error message to display */
  error?: string
  /** Helper text to display below textarea */
  helperText?: string
}

function Textarea({
  className,
  variant,
  label,
  error,
  helperText,
  id,
  ...props
}: TextareaProps) {
  const generatedId = React.useId()
  const textareaId = id ?? generatedId
  const descriptionId = error || helperText ? `${textareaId}-description` : undefined

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={textareaId} className="text-sm font-medium text-muted-foreground">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        aria-invalid={Boolean(error)}
        aria-describedby={descriptionId}
        className={cn(textareaVariants({ variant }), error && "border-destructive bg-destructive/10 text-destructive", className)}
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

Textarea.displayName = "Textarea"

export { Textarea, textareaVariants }