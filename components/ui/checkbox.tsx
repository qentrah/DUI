import * as React from "react"
import { Check } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const checkboxBoxVariants = cva(
  "checkbox-box relative inline-flex items-center justify-center rounded-lg border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20",
  {
    variants: {
      size: {
        sm: "size-4",
        md: "size-5",
        lg: "size-6",
      },
      isIndeterminate: {
        true: "border-primary bg-primary/20",
        false: "",
      },
    },
    defaultVariants: { size: "md" },
  }
)

export interface CheckboxProps extends Omit<React.HTMLAttributes<HTMLLabelElement>, "onChange">, VariantProps<typeof checkboxBoxVariants> {
  /** Whether the checkbox is checked */
  isSelected?: boolean
  /** Default checked state (uncontrolled) */
  defaultSelected?: boolean
  /** Handler called when the checked state changes */
  onChange?: (selected: boolean) => void
  /** Whether the checkbox is in an indeterminate state */
  isIndeterminate?: boolean
  /** Whether the checkbox is disabled */
  isDisabled?: boolean
}

function Checkbox({
  className,
  isSelected,
  defaultSelected,
  onChange,
  isIndeterminate,
  isDisabled,
  size,
  ...props
}: CheckboxProps) {
  const [internal, setInternal] = React.useState(defaultSelected ?? false)
  const selected = isSelected ?? internal

  function toggle() {
    if (isDisabled) return
    const next = !selected
    if (isSelected === undefined) setInternal(next)
    onChange?.(next)
  }

  return (
    <label className={cn("relative inline-flex items-center gap-2", className)} {...props}>
      <input
        type="checkbox"
        checked={selected}
        disabled={isDisabled}
        onChange={() => {}}
        className="sr-only"
        aria-disabled={isDisabled}
      />
      <span
        className={cn(
          checkboxBoxVariants({ size, isIndeterminate: Boolean(isIndeterminate || selected) }),
          selected || isIndeterminate ? "border-primary bg-primary" : "border-border bg-surface",
          isDisabled && "opacity-50 cursor-not-allowed"
        )}
        onClick={toggle}
        data-checked={selected || undefined}
        data-indeterminate={isIndeterminate || undefined}
        data-disabled={isDisabled || undefined}
      >
        {selected && !isIndeterminate && <Check className="size-3 text-primary-foreground" />}
        {isIndeterminate && <span className="block w-2 h-0.5 bg-primary-foreground" />}
      </span>
    </label>
  )
}

Checkbox.displayName = "Checkbox"

export { Checkbox, checkboxBoxVariants }