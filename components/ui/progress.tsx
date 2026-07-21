import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const progressVariants = cva(
  "progress h-2 w-full overflow-hidden rounded-full bg-surface-secondary transition-colors",
  {
    variants: {
      size: {
        sm: "h-1",
        md: "h-2",
        lg: "h-3",
      },
    },
    defaultVariants: { size: "md" },
  }
)

const progressBarVariants = cva("h-full bg-primary transition-all duration-200")

export interface ProgressProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">,
    VariantProps<typeof progressVariants> {
  /** Current value (0-100) */
  value?: number
  /** Maximum value */
  max?: number
}

function Progress({ className, size, value = 0, max = 100, ...props }: ProgressProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100))
  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      className={cn(progressVariants({ size }), className)}
      {...props}
    >
      <div className={progressBarVariants()} style={{ width: `${percentage}%` }} />
    </div>
  )
}

Progress.displayName = "Progress"

export { Progress, progressVariants }