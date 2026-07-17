import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const emptyStateVariants = cva(
  "flex flex-col items-center justify-center text-center rounded-xl border border-dashed border-zinc-800",
  {
    variants: {
      size: {
        sm: "p-6 min-h-[120px]",
        md: "p-8 min-h-[200px]",
        lg: "p-10 min-h-[256px]"
      }
    },
    defaultVariants: { size: "md" }
  }
)

const iconSize: Record<"sm" | "md" | "lg", string> = {
  sm: "h-5 w-5",
  md: "h-8 w-8",
  lg: "h-10 w-10"
}

const titleSize: Record<"sm" | "md" | "lg", string> = {
  sm: "text-[11px] font-semibold",
  md: "text-sm font-semibold",
  lg: "text-base font-semibold"
}

const descSize: Record<"sm" | "md" | "lg", string> = {
  sm: "text-[10px]",
  md: "text-xs",
  lg: "text-sm"
}

export interface EmptyStateProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof emptyStateVariants> {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ icon, title, description, size = "md", action, children, className, ...props }, ref) => {
    const resolved = size ?? "md"
    return (
      <div ref={ref} className={cn(emptyStateVariants({ size: resolved }), className)} {...props}>
        {icon ? (
          <div className={cn("mb-2 text-zinc-500", iconSize[resolved])} aria-hidden>
            {icon}
          </div>
        ) : null}
        <p className={cn("text-foreground", titleSize[resolved])}>{title}</p>
        {description ? (
          <p className={cn("mt-1 max-w-md text-muted-foreground", descSize[resolved])}>{description}</p>
        ) : null}
        {action ? <div className="mt-3">{action}</div> : null}
        {children}
      </div>
    )
  }
)
EmptyState.displayName = "EmptyState"

export { EmptyState, emptyStateVariants }
