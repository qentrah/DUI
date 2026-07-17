"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const filterChipVariants = cva(
  "inline-flex items-center gap-1.5 rounded-lg border font-bold tracking-wide transition-all",
  {
    variants: {
      size: {
        sm: "px-2.5 py-1 text-[10px]",
        md: "px-3.5 py-1.5 text-[11px]",
        lg: "px-5 py-2 text-[11px]"
      },
      active: {
        true: "border-primary bg-primary text-primary-foreground shadow-sm",
        false: "border-zinc-800 bg-zinc-900 text-muted-foreground hover:border-zinc-700 hover:bg-zinc-800 hover:text-foreground"
      }
    },
    defaultVariants: { size: "md", active: false }
  }
)

export interface FilterChipProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    VariantProps<typeof filterChipVariants> {
  count?: number
}

const FilterChip = React.forwardRef<HTMLButtonElement, FilterChipProps>(
  ({ active = false, size = "md", count, className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        aria-pressed={Boolean(active)}
        className={cn(filterChipVariants({ size, active: Boolean(active) }), className)}
        {...props}
      >
        {children}
        {count !== undefined && (
          <span
            className={cn(
              "rounded-full px-1.5 text-[9px] font-bold",
              active ? "bg-primary-foreground/20 text-primary-foreground" : "bg-zinc-800 text-muted-foreground"
            )}
          >
            {count}
          </span>
        )}
      </button>
    )
  }
)
FilterChip.displayName = "FilterChip"

export interface FilterChipBarProps {
  chips: Array<{ key: string; label: string; count?: number }>
  activeKey: string
  onChange: (key: string) => void
  size?: "sm" | "md" | "lg"
  className?: string
}

function FilterChipBar({ chips, activeKey, onChange, size = "md", className }: FilterChipBarProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)} role="group">
      {chips.map((chip) => (
        <FilterChip
          key={chip.key}
          active={activeKey === chip.key}
          onClick={() => onChange(chip.key)}
          size={size}
          count={chip.count}
        >
          {chip.label}
        </FilterChip>
      ))}
    </div>
  )
}

export { FilterChip, FilterChipBar, filterChipVariants }
