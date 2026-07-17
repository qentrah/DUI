import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const colorDotVariants = cva("inline-block shrink-0 rounded-full", {
  variants: {
    size: {
      xs: "h-1.5 w-1.5",
      sm: "h-2 w-2",
      md: "h-2.5 w-2.5",
      lg: "h-3 w-3"
    }
  },
  defaultVariants: { size: "sm" }
})

export interface ColorDotProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children" | "color">,
    VariantProps<typeof colorDotVariants> {
  color?: string
  dotClassName?: string
  ring?: boolean
  label?: string
}

const ColorDot = React.forwardRef<HTMLSpanElement, ColorDotProps>(
  ({ color = "#71717a", dotClassName, size = "sm", ring = false, label, className, ...props }, ref) => {
    return (
      <span ref={ref} className={cn("inline-flex items-center gap-2", className)} {...props}>
        <span
          aria-hidden={!label}
          className={cn(colorDotVariants({ size }), dotClassName, !dotClassName && ring && "ring-1 ring-offset-1 ring-offset-white")}
          style={
            dotClassName
              ? undefined
              : {
                  backgroundColor: color,
                  ...(ring ? { boxShadow: `0 0 0 1px ${color}` } : {})
                }
          }
        />
        {label ? <span className="text-[13px] text-zinc-950">{label}</span> : null}
      </span>
    )
  }
)
ColorDot.displayName = "ColorDot"

export { ColorDot, colorDotVariants }
