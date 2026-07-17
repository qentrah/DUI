import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const statusPillVariants = cva(
  "inline-flex items-center gap-1 rounded-full border font-semibold uppercase tracking-wider whitespace-nowrap",
  {
    variants: {
      tone: {
        success: "",
        warning: "",
        danger: "",
        info: "",
        neutral: ""
      },
      variant: {
        soft: "",
        solid: "",
        outline: ""
      },
      size: {
        sm: "px-2 py-0.5 text-[10px]",
        md: "px-2.5 py-0.5 text-[11px]"
      }
    },
    compoundVariants: [
      { tone: "success", variant: "soft", class: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20" },
      { tone: "warning", variant: "soft", class: "bg-amber-500/10 text-amber-700 border-amber-500/20" },
      { tone: "danger", variant: "soft", class: "bg-rose-500/10 text-rose-700 border-rose-500/20" },
      { tone: "info", variant: "soft", class: "bg-sky-500/10 text-sky-700 border-sky-500/20" },
      { tone: "neutral", variant: "soft", class: "bg-zinc-500/10 text-zinc-700 border-zinc-500/20" },
      { tone: "success", variant: "solid", class: "bg-emerald-500 text-white border-emerald-500" },
      { tone: "warning", variant: "solid", class: "bg-amber-500 text-white border-amber-500" },
      { tone: "danger", variant: "solid", class: "bg-rose-500 text-white border-rose-500" },
      { tone: "info", variant: "solid", class: "bg-sky-500 text-white border-sky-500" },
      { tone: "neutral", variant: "solid", class: "bg-zinc-500 text-white border-zinc-500" },
      { tone: "success", variant: "outline", class: "bg-transparent border-emerald-500 text-emerald-700" },
      { tone: "warning", variant: "outline", class: "bg-transparent border-amber-500 text-amber-700" },
      { tone: "danger", variant: "outline", class: "bg-transparent border-rose-500 text-rose-700" },
      { tone: "info", variant: "outline", class: "bg-transparent border-sky-500 text-sky-700" },
      { tone: "neutral", variant: "outline", class: "bg-transparent border-zinc-500 text-zinc-700" }
    ],
    defaultVariants: { tone: "neutral", variant: "soft", size: "md" }
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
