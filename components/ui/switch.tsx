"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const switchControlVariants = cva(
  "inline-flex items-center rounded-full outline-none disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  {
    variants: {
      size: {
        sm: "h-5 w-9 p-0.5",
        md: "h-6 w-11 p-0.5",
        lg: "h-7 w-14 p-1",
      },
      theme: {
        primary: "focus-visible:ring-primary/20",
        secondary: "focus-visible:ring-secondary/20",
        success: "focus-visible:ring-success/20",
        warning: "focus-visible:ring-warning/20",
        danger: "focus-visible:ring-destructive/20",
      },
    },
    defaultVariants: { size: "md", theme: "primary" },
  }
)

const switchThumbVariants = cva(
  "block rounded-full shadow-md transition-transform duration-200",
  {
    variants: {
      size: {
        sm: "size-4",
        md: "size-5",
        lg: "size-6",
      },
    },
    defaultVariants: { size: "md" },
  }
)

const thumbTranslate = {
  sm: { on: "translate-x-4 rtl:-translate-x-4", off: "translate-x-0" },
  md: { on: "translate-x-5 rtl:-translate-x-5", off: "translate-x-0" },
  lg: { on: "translate-x-7 rtl:-translate-x-7", off: "translate-x-0" },
}

const thumbColors: Record<NonNullable<VariantProps<typeof switchControlVariants>["theme"]>, string> = {
  primary: "bg-primary-foreground",
  secondary: "bg-secondary-foreground",
  success: "bg-success-foreground",
  warning: "bg-warning-foreground",
  danger: "bg-destructive-foreground",
}

const trackColors: Record<NonNullable<VariantProps<typeof switchControlVariants>["theme"]>, { on: string; off: string }> = {
  primary: { on: "bg-primary", off: "bg-surface-secondary" },
  secondary: { on: "bg-secondary", off: "bg-surface-secondary" },
  success: { on: "bg-success", off: "bg-surface-secondary" },
  warning: { on: "bg-warning", off: "bg-surface-secondary" },
  danger: { on: "bg-destructive", off: "bg-surface-secondary" },
}

const thumbOffColors: Record<NonNullable<VariantProps<typeof switchControlVariants>["theme"]>, string> = {
  primary: "bg-white",
  secondary: "bg-white",
  success: "bg-white",
  warning: "bg-white",
  danger: "bg-white",
}

export interface SwitchProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange">,
    VariantProps<typeof switchControlVariants> {
  /** Whether the switch is checked */
  isSelected?: boolean
  /** Default selected state (uncontrolled) */
  defaultSelected?: boolean
  /** Handler called when the checked state changes */
  onChange?: (selected: boolean) => void
  /** Whether the switch is disabled */
  isDisabled?: boolean
  /** Label for the switch */
  children?: React.ReactNode
}

function Switch({
  isSelected,
  defaultSelected,
  onChange,
  isDisabled,
  size,
  theme = "primary",
  className,
  children,
  ...props
}: SwitchProps) {
  const [internalSelected, setInternalSelected] = React.useState(defaultSelected ?? false)
  const selected = isSelected ?? internalSelected

  function toggle() {
    if (isDisabled) return
    const next = !selected
    if (isSelected === undefined) setInternalSelected(next)
    onChange?.(next)
  }

  const sizeKey = size ?? "md"
  const themeKey = theme ?? "primary"
  const thumbPosition = selected ? thumbTranslate[sizeKey].on : thumbTranslate[sizeKey].off
  const thumbColor = selected ? thumbColors[themeKey] : thumbOffColors[themeKey]
  const trackColor = trackColors[themeKey]

  return (
    <label className="inline-flex items-center gap-2">
      <button
        type="button"
        role="switch"
        aria-checked={selected}
        aria-disabled={isDisabled}
        disabled={isDisabled}
        onClick={toggle}
        className={cn(
          switchControlVariants({ size, theme }),
          selected ? trackColor.on : trackColor.off
        )}
        {...props}
      >
        <span className={cn(switchThumbVariants({ size }), thumbPosition, thumbColor)} />
      </button>
      {children && <span className="text-sm text-foreground">{children}</span>}
    </label>
  )
}

Switch.displayName = "Switch"

export { Switch, switchControlVariants, switchThumbVariants }