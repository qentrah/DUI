import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", {
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground",
      secondary: "bg-secondary text-secondary-foreground",
      success: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25",
      warning: "bg-yellow-500/15 text-yellow-400 border border-yellow-500/25",
      destructive: "bg-destructive/15 text-destructive border border-destructive/25",
      outline: "border border-border text-muted-foreground"
    }
  },
  defaultVariants: { variant: "default" }
})

function Badge({ className, variant, ...props }: React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
