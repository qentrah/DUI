import * as React from "react"
import { AlertCircle, AlertTriangle, Check, Clock, X } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const statusBadgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border border-zinc-200/60 px-2.5 py-0.5 text-[12px] font-medium",
  {
    variants: {
      variant: {
        active: "bg-emerald-500/10 text-emerald-700",
        inactive: "bg-zinc-500/10 text-zinc-600",
        pending: "bg-amber-500/10 text-amber-700",
        warning: "bg-amber-500/10 text-amber-700",
        error: "bg-rose-500/10 text-rose-700"
      }
    },
    defaultVariants: { variant: "active" }
  }
)

const iconClass: Record<NonNullable<VariantProps<typeof statusBadgeVariants>["variant"]>, string> = {
  active: "text-emerald-600",
  inactive: "text-zinc-500",
  pending: "text-amber-600",
  warning: "text-amber-600",
  error: "text-rose-600"
}

function StatusIcon({ variant }: { variant: NonNullable<VariantProps<typeof statusBadgeVariants>["variant"]> }) {
  const className = cn("h-3 w-3", iconClass[variant])
  switch (variant) {
    case "active":
      return <Check className={className} />
    case "inactive":
      return <X className={className} />
    case "pending":
      return <Clock className={className} />
    case "warning":
      return <AlertTriangle className={className} />
    case "error":
      return <AlertCircle className={className} />
  }
}

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusBadgeVariants> {
  showIcon?: boolean
}

const StatusBadge = React.forwardRef<HTMLSpanElement, StatusBadgeProps>(
  ({ variant = "active", showIcon = true, className, children, ...props }, ref) => {
    const resolved = variant ?? "active"
    return (
      <span ref={ref} className={cn(statusBadgeVariants({ variant: resolved }), className)} {...props}>
        {showIcon ? <StatusIcon variant={resolved} /> : null}
        {children}
      </span>
    )
  }
)
StatusBadge.displayName = "StatusBadge"

export { StatusBadge, statusBadgeVariants }
