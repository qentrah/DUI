"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const tagChipVariants = cva(
  "inline-flex items-center gap-1 rounded-md border font-semibold whitespace-nowrap",
  {
    variants: {
      tone: {
        gray: "border-zinc-500/20 bg-zinc-500/15 text-zinc-400",
        blue: "border-sky-500/20 bg-sky-500/15 text-sky-400",
        green: "border-emerald-500/20 bg-emerald-500/15 text-emerald-400",
        amber: "border-amber-500/20 bg-amber-500/15 text-amber-400",
        red: "border-rose-500/20 bg-rose-500/15 text-rose-400",
        purple: "border-purple-500/20 bg-purple-500/15 text-purple-400",
        pink: "border-pink-500/20 bg-pink-500/15 text-pink-400",
        cyan: "border-cyan-500/20 bg-cyan-500/15 text-cyan-400",
        custom: "border-transparent"
      },
      size: {
        sm: "px-1.5 py-0.5 text-[9px]",
        md: "px-2 py-0.5 text-[10px]"
      },
      outline: {
        true: "bg-transparent",
        false: ""
      }
    },
    defaultVariants: { tone: "gray", size: "md", outline: false }
  }
)

export interface TagChipProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children" | "color">,
    VariantProps<typeof tagChipVariants> {
  label: React.ReactNode
  customBg?: string
  customColor?: string
  removable?: boolean
  onRemove?: () => void
  icon?: React.ReactNode
}

const TagChip = React.forwardRef<HTMLSpanElement, TagChipProps>(
  (
    {
      tone = "gray",
      label,
      size = "md",
      outline = false,
      customBg,
      customColor,
      removable,
      onRemove,
      icon,
      className,
      ...props
    },
    ref
  ) => {
    const style: React.CSSProperties =
      tone === "custom" ? { backgroundColor: customBg, color: customColor } : {}

    return (
      <span
        ref={ref}
        className={cn(tagChipVariants({ tone, size, outline: Boolean(outline) }), className)}
        style={style}
        {...props}
      >
        {icon}
        {label}
        {removable ? (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              onRemove?.()
            }}
            aria-label="Remove tag"
            className="ms-0.5 inline-flex h-3 w-3 items-center justify-center rounded-sm hover:bg-white/10"
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
