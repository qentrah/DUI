import * as React from "react"

import { cn } from "@/lib/utils"

export interface LegendItemProps extends React.HTMLAttributes<HTMLDivElement> {
  color: string
  label: React.ReactNode
  value?: React.ReactNode
  icon?: React.ReactNode
  size?: "sm" | "md"
}

const LegendItem = React.forwardRef<HTMLDivElement, LegendItemProps>(
  ({ color, label, value, icon, size = "sm", className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("inline-flex items-center gap-1.5", size === "sm" ? "text-[10px]" : "text-xs", className)}
        {...props}
      >
        {icon ?? (
          <span aria-hidden className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: color }} />
        )}
        <span className="font-semibold text-zinc-500">{label}</span>
        {value !== undefined ? <span className="font-bold text-zinc-950">{value}</span> : null}
      </div>
    )
  }
)
LegendItem.displayName = "LegendItem"

export { LegendItem }
