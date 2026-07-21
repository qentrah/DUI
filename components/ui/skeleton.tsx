import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const skeletonVariants = cva("skeleton animate-pulse rounded-xl bg-surface-secondary transition-colors", {
  variants: {
    rounded: {
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      full: "rounded-full",
      none: "rounded-none",
    },
  },
  defaultVariants: { rounded: "md" },
})

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof skeletonVariants> {}

function Skeleton({ className, rounded, ...props }: SkeletonProps) {
  return <div className={cn(skeletonVariants({ rounded }), className)} {...props} />
}

Skeleton.displayName = "Skeleton"

export { Skeleton, skeletonVariants }