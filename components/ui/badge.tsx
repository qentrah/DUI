import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "badge inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground shadow-sm",
        secondary: "bg-secondary text-secondary-foreground shadow-sm",
        tertiary: "bg-tertiary/20 text-tertiary shadow-sm",
        success: "bg-success/10 text-success border border-success/20",
        warning: "bg-warning/10 text-warning border border-warning/20",
        danger: "bg-destructive/10 text-destructive border border-destructive/20",
        outline: "border border-border text-muted-foreground bg-transparent",
      },
    },
    defaultVariants: { variant: "primary" },
  }
)

function Badge({ className, variant, ...props }: React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}

Badge.displayName = "Badge"

export { Badge, badgeVariants }