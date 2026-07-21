import * as React from "react"
import { AlertCircle, AlertTriangle, Check, Clock, X } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const statusBadgeVariants = cva(
  "status-badge inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[12px] font-medium transition-colors",
  {
    variants: {
      variant: {
        active: "bg-success-bg text-success border-success-border",
        inactive: "bg-surface-secondary text-muted-foreground border-border",
        pending: "bg-warning-bg text-warning border-warning-border",
        warning: "bg-warning-bg text-warning border-warning-border",
        error: "bg-destructive-bg text-destructive border-destructive-border",
      },
    },
    defaultVariants: { variant: "active" },
  }
)

const iconClass: Record<NonNullable<VariantProps<typeof statusBadgeVariants>["variant"]>, string> = {
  active: "text-success",
  inactive: "text-muted-foreground",
  pending: "text-warning",
  warning: "text-warning",
  error: "text-destructive",
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