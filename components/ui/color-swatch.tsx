"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const colorSwatchVariants = cva(
  "color-swatch rounded-xl border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20",
  {
    variants: {
      size: {
        xs: "h-5 w-5",
        sm: "h-6 w-6",
        md: "h-8 w-8",
        lg: "h-10 w-10",
      },
      selected: {
        true: "border-primary scale-110 shadow-md",
        false: "border-border hover:border-border-hover hover:scale-105",
      },
    },
    defaultVariants: { size: "md", selected: false },
  }
)

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