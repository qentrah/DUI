"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const colorSwatchVariants = cva("rounded-full border-2 transition-all", {
  variants: {
    size: {
      xs: "h-4 w-4",
      sm: "h-5 w-5",
      md: "h-6 w-6",
      lg: "h-8 w-8"
    },
    selected: {
      true: "scale-110 border-zinc-950",
      false: "border-transparent hover:scale-105"
    }
  },
  defaultVariants: { size: "md", selected: false }
})

export interface ColorSwatchProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children" | "color">,
    VariantProps<typeof colorSwatchVariants> {
  color: string
  ariaLabel?: string
}

const ColorSwatch = React.forwardRef<HTMLButtonElement, ColorSwatchProps>(
  ({ color, selected = false, size = "md", ariaLabel, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        role="radio"
        aria-checked={Boolean(selected)}
        aria-label={ariaLabel ?? `Color ${color}`}
        className={cn(colorSwatchVariants({ size, selected: Boolean(selected) }), className)}
        style={{ backgroundColor: color }}
        {...props}
      />
    )
  }
)
ColorSwatch.displayName = "ColorSwatch"

export { ColorSwatch, colorSwatchVariants }
