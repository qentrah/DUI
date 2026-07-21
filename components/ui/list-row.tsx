"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const listRowVariants = cva(
  "list-row flex items-center gap-3 px-4 py-3 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20",
  {
    variants: {
      variant: {
        default: "border-b border-border hover:bg-accent/50",
        compact: "rounded-xl px-2.5 py-1.5 hover:bg-accent/40",
        card: "rounded-2xl border border-border bg-card hover:bg-accent/50",
      },
      selected: {
        true: "bg-accent/40",
        false: "",
      },
    },
    defaultVariants: { variant: "default", selected: false },
  }
)

export interface ListRowProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "title">,
    VariantProps<typeof listRowVariants> {
  leading?: React.ReactNode
  title: React.ReactNode
  subtitle?: React.ReactNode
  trailing?: React.ReactNode
  meta?: React.ReactNode
  onPress?: () => void
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
      onPress,
      onClick,
      className,
      ...props
    },
    ref
  ) => {
    const handlePress = onPress ?? onClick

    return (
      <div
        ref={ref}
        role={handlePress ? "button" : undefined}
        tabIndex={handlePress ? 0 : undefined}
        onClick={handlePress}
        onKeyDown={
          handlePress
            ? (event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault()
                  handlePress?.(event as unknown as React.MouseEvent<HTMLDivElement>)
                }
              }
            : undefined
        }
        className={cn(
          listRowVariants({ variant, selected: Boolean(selected) }),
          handlePress && "cursor-pointer",
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