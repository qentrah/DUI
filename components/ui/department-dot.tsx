import * as React from "react"

import { ColorDot } from "@/components/ui/color-dot"

export type Department =
  | "finance"
  | "hr"
  | "marketing"
  | "sales"
  | "engineering"
  | "operations"
  | "legal"
  | "support"

export interface DepartmentDotProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  department: Department | string
  showLabel?: boolean
}

export const departmentColors: Record<string, string> = {
  finance: "#16a34a",
  hr: "#f97316",
  marketing: "#a855f7",
  sales: "#3b82f6",
  engineering: "#6b7280",
  operations: "#0891b2",
  legal: "#6366f1",
  support: "#ec4899"
}

const DepartmentDot = React.forwardRef<HTMLSpanElement, DepartmentDotProps>(
  ({ department, showLabel = false, className, ...props }, ref) => {
    const color = departmentColors[department.toLowerCase()] || "#6b7280"
    return (
      <ColorDot
        ref={ref}
        color={color}
        size="sm"
        label={showLabel ? department : undefined}
        className={className}
        {...props}
      />
    )
  }
)
DepartmentDot.displayName = "DepartmentDot"

export { DepartmentDot }
