import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const statusPillVariants = cva(
  "status-pill inline-flex items-center gap-1 rounded-full border font-semibold uppercase tracking-wider whitespace-nowrap transition-colors",
  {
    variants: {
      tone: {
        success: "",
        warning: "",
        danger: "",
        primary: "",
        neutral: "",
      },
      variant: {
        soft: "",
        solid: "",
        outline: "",
      },
      size: {
        sm: "px-2 py-0.5 text-[10px]",
        md: "px-2.5 py-0.5 text-[11px]",
      },
    },
    compoundVariants: [
      { tone: "success", variant: "soft", class: "bg-success/10 text-success border-success/20" },
      { tone: "warning", variant: "soft", class: "bg-warning/10 text-warning border-warning/20" },
      { tone: "danger", variant: "soft", class: "bg-destructive/10 text-destructive border-destructive/20" },
      { tone: "primary", variant: "soft", class: "bg-primary/10 text-primary border-primary/20" },
      { tone: "neutral", variant: "soft", class: "bg-surface-secondary text-muted-foreground border-border" },
      { tone: "success", variant: "solid", class: "bg-success text-success-foreground border-success" },
      { tone: "warning", variant: "solid", class: "bg-warning text-warning-foreground border-warning" },
      { tone: "danger", variant: "solid", class: "bg-destructive text-destructive-foreground border-destructive" },
      { tone: "primary", variant: "solid", class: "bg-primary text-primary-foreground border-primary" },
      { tone: "neutral", variant: "solid", class: "bg-secondary text-secondary-foreground border-secondary" },
      { tone: "success", variant: "outline", class: "bg-transparent border-success text-success" },
      { tone: "warning", variant: "outline", class: "bg-transparent border-warning text-warning" },
      { tone: "danger", variant: "outline", class: "bg-transparent border-destructive text-destructive" },
      { tone: "primary", variant: "outline", class: "bg-transparent border-primary text-primary" },
      { tone: "neutral", variant: "outline", class: "bg-transparent border-border text-muted-foreground" },
    ],
    defaultVariants: { tone: "neutral", variant: "soft", size: "md" },
  }
)

export interface StatusPillProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children">,
    VariantProps<typeof statusPillVariants> {
  label: React.ReactNode
  icon?: React.ReactNode
}

const StatusPill = React.forwardRef<HTMLSpanElement, StatusPillProps>(
  ({ tone = "neutral", label, icon, size = "md", variant = "soft", className, ...props }, ref) => {
    return (
      <span ref={ref} className={cn(statusPillVariants({ tone, variant, size }), className)} {...props}>
        {icon}
        {label}
      </span>
    )
  }
)
StatusPill.displayName = "StatusPill"

export { StatusPill, statusPillVariants }