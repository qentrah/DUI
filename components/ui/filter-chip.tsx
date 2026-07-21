"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const filterChipVariants = cva(
  "filter-chip inline-flex items-center gap-1.5 rounded-xl border font-medium tracking-wide transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20",
  {
    variants: {
      size: {
        sm: "px-2.5 py-1 text-[10px]",
        md: "px-3.5 py-1.5 text-[11px]",
        lg: "px-5 py-2 text-[11px]",
      },
      isSelected: {
        true: "border-primary bg-primary text-primary-foreground shadow-md",
        false: "border-border bg-surface text-muted-foreground hover:border-border-hover hover:bg-surface-secondary hover:text-foreground",
      },
    },
    defaultVariants: { size: "md", isSelected: false },
  }
)

export interface FilterChipProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color" | "onClick">,
    VariantProps<typeof filterChipVariants> {
  /** Whether the chip is selected */
  isSelected?: boolean
  /** Whether the chip is disabled */
  isDisabled?: boolean
  /** Count to display in the chip */
  count?: number
  /** Handler called when the chip is pressed */
  onPress?: () => void
}

const FilterChip = React.forwardRef<HTMLButtonElement, FilterChipProps>(
  ({ isSelected = false, size = "md", count, className, children, onPress, isDisabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        role="checkbox"
        aria-checked={isSelected}
        aria-disabled={isDisabled}
        disabled={isDisabled}
        onClick={onPress}
        className={cn(filterChipVariants({ size, isSelected: Boolean(isSelected) }), className)}
        {...props}
      >
        {children}
        {count !== undefined && (
          <span
            className={cn(
              "rounded-full px-1.5 text-[9px] font-bold",
              isSelected
                ? "bg-primary-foreground/20 text-primary-foreground"
                : "bg-surface-secondary text-muted-foreground"
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
  selectedKey: string
  onChange: (key: string) => void
  size?: "sm" | "md" | "lg"
  className?: string
}

function FilterChipBar({ chips, selectedKey, onChange, size = "md", className }: FilterChipBarProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)} role="group">
      {chips.map((chip) => (
        <FilterChip
          key={chip.key}
          isSelected={selectedKey === chip.key}
          onPress={() => onChange(chip.key)}
          size={size}
          count={chip.count}
        >
          {chip.label}
        </FilterChip>
      ))}
    </div>
  )
}
FilterChipBar.displayName = "FilterChipBar"

export { FilterChip, FilterChipBar, filterChipVariants }