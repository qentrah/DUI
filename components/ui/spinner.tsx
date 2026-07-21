import * as React from "react"
import { LoaderCircle } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const spinnerVariants = cva("spinner animate-spin transition-colors", {
  variants: {
    size: {
      sm: "size-3",
      md: "size-4",
      lg: "size-5",
    },
  },
  defaultVariants: { size: "md" },
})

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof spinnerVariants> {
  /** Color variant for the spinner */
  color?: "default" | "primary" | "current"
}

function Spinner({ className, size, color = "default", ...props }: SpinnerProps) {
  const colorClass = {
    default: "text-foreground",
    primary: "text-primary",
    current: "text-current",
  }

  return (
    <span className={cn(spinnerVariants({ size }), colorClass[color], className)} {...props}>
      <LoaderCircle className="h-full w-full" />
    </span>
  )
}

Spinner.displayName = "Spinner"

export { Spinner, spinnerVariants }