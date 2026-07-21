import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const colorDotVariants = cva(
  "inline-flex items-center justify-center rounded-full shrink-0 transition-colors",
  {
    variants: {
      size: {
        xs: "h-3 w-3",
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
      },
    },
    defaultVariants: { size: "sm" },
  }
)

export interface ColorDotProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children" | "color">,
    VariantProps<typeof colorDotVariants> {
  color?: string
  dotClassName?: string
  ring?: boolean
  label?: string
}

const ColorDot = React.forwardRef<HTMLSpanElement, ColorDotProps>(
  ({ color = "#6b7280", dotClassName, size = "sm", ring = false, label, className, ...props }, ref) => {
    const bgColor = ring ? `${color}20` : color

    return (
      <span ref={ref} className={cn("inline-flex items-center gap-2", className)} {...props}>
        <span
          aria-hidden={!label}
          className={cn(colorDotVariants({ size }), dotClassName, !dotClassName && (ring ? "ring-1 ring-border" : ""))}
          style={{ backgroundColor: bgColor }}
        />
        {label ? <span className="text-[13px] text-foreground">{label}</span> : null}
      </span>
    )
  }
)
ColorDot.displayName = "ColorDot"

export { ColorDot, colorDotVariants }