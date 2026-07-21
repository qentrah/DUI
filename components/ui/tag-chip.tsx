"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const tagChipVariants = cva(
  "tag-chip inline-flex items-center gap-1 rounded-lg border font-semibold whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20",
  {
    variants: {
      tone: {
        gray: "border-border bg-surface-secondary text-muted-foreground",
        primary: "border-primary/20 bg-primary/10 text-primary",
        secondary: "border-secondary/20 bg-secondary/10 text-secondary",
        success: "border-success/20 bg-success/10 text-success",
        warning: "border-warning/20 bg-warning/10 text-warning",
        danger: "border-destructive/20 bg-destructive/10 text-destructive",
        purple: "border-purple-500/20 bg-purple-500/10 text-purple-400",
        pink: "border-pink-500/20 bg-pink-500/10 text-pink-400",
        cyan: "border-cyan-500/20 bg-cyan-500/10 text-cyan-400",
      },
      size: {
        sm: "px-1.5 py-0.5 text-[9px]",
        md: "px-2 py-0.5 text-[10px]",
      },
      outline: {
        true: "bg-transparent",
        false: "",
      },
    },
    defaultVariants: { tone: "gray", size: "md", outline: false },
  }
)

export interface TagChipProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children" | "color">,
    VariantProps<typeof tagChipVariants> {
  /** The label to display in the chip */
  label: React.ReactNode
  /** Whether the chip can be removed */
  isDismissable?: boolean
  /** Handler called when remove button is pressed */
  onRemove?: () => void
  /** Optional icon to display */
  icon?: React.ReactNode
}

const TagChip = React.forwardRef<HTMLSpanElement, TagChipProps>(
  (
    {
      tone = "gray",
      label,
      size = "md",
      outline = false,
      isDismissable,
      onRemove,
      icon,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <span ref={ref} className={cn(tagChipVariants({ tone, size, outline: Boolean(outline) }), className)} {...props}>
        {icon}
        {label}
        {isDismissable ? (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              onRemove?.()
            }}
            aria-label="Remove tag"
            className="ms-0.5 inline-flex h-3 w-3 items-center justify-center rounded-sm hover:bg-foreground/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground/20"
          >
            <svg viewBox="0 0 12 12" className="h-2 w-2" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M3 3 L9 9 M9 3 L3 9" />
            </svg>
          </button>
        ) : null}
      </span>
    )
  }
)
TagChip.displayName = "TagChip"

export { TagChip, tagChipVariants }