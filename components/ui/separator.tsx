import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const separatorVariants = cva(
  "separator shrink-0 bg-border transition-colors",
  {
    variants: {
      orientation: {
        horizontal: "h-px w-full",
        vertical: "h-full w-px",
      },
    },
    defaultVariants: { orientation: "horizontal" },
  }
)

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof separatorVariants> {}

function Separator({ orientation = "horizontal", className, ...props }: SeparatorProps) {
  return (
    <div
      role="separator"
      aria-orientation={orientation === "vertical" ? "vertical" : undefined}
      className={cn(separatorVariants({ orientation }), className)}
      {...props}
    />
  )
}

Separator.displayName = "Separator"

export { Separator, separatorVariants }