"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const listRowVariants = cva("flex items-center gap-3 px-4 py-3 transition-colors", {
  variants: {
    variant: {
      default: "border-b border-border hover:bg-zinc-900/50",
      compact: "rounded-lg px-2 py-1.5 hover:bg-accent/60 hover:text-accent-foreground",
      card: "rounded-xl border border-border bg-card hover:bg-zinc-900/50"
    },
    selected: {
      true: "bg-accent/30",
      false: ""
    }
  },
  defaultVariants: { variant: "default", selected: false }
})

export interface ListRowProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "title">,
    VariantProps<typeof listRowVariants> {
  leading?: React.ReactNode
  title: React.ReactNode
  subtitle?: React.ReactNode
  trailing?: React.ReactNode
  meta?: React.ReactNode
  onActivate?: () => void
}

const ListRow = React.forwardRef<HTMLDivElement, ListRowProps>(
  (
    {
      leading,
      title,
      subtitle,
      trailing,
      meta,
      selected = false,
      variant = "default",
      onActivate,
      onClick,
      className,
      ...props
    },
    ref
  ) => {
    const interactive = Boolean(onActivate || onClick)
    const handleActivate = onActivate ?? onClick

    return (
      <div
        ref={ref}
        role={interactive ? "button" : undefined}
        tabIndex={interactive ? 0 : undefined}
        onClick={handleActivate}
        onKeyDown={
          interactive
            ? (event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault()
                  handleActivate?.(event as unknown as React.MouseEvent<HTMLDivElement>)
                }
              }
            : undefined
        }
        className={cn(
          listRowVariants({ variant, selected: Boolean(selected) }),
          interactive && "cursor-pointer",
          className
        )}
        {...props}
      >
        {leading ? <div className="shrink-0">{leading}</div> : null}
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-medium text-foreground">{title}</div>
          {subtitle ? <div className="mt-0.5 truncate text-xs text-muted-foreground">{subtitle}</div> : null}
        </div>
        {meta ? <div className="shrink-0 text-xs text-muted-foreground">{meta}</div> : null}
        {trailing ? <div className="shrink-0">{trailing}</div> : null}
      </div>
    )
  }
)
ListRow.displayName = "ListRow"

export { ListRow, listRowVariants }
