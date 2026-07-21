import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const fiveIconVariants = cva(
  "inline-flex items-center justify-center rounded-lg shrink-0 transition-colors",
  {
    variants: {
      size: {
        sm: "h-8 w-8",
        md: "h-10 w-10",
        lg: "h-12 w-12",
      },
      variant: {
        primary: "bg-primary/10 text-primary",
        secondary: "bg-secondary/10 text-secondary",
        success: "bg-success/10 text-success",
        warning: "bg-warning/10 text-warning",
        danger: "bg-destructive/10 text-destructive",
        accent: "bg-accent/10 text-accent-foreground",
      },
    },
    defaultVariants: { size: "md", variant: "primary" },
  }
)

export interface FiveIconProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children">,
    VariantProps<typeof fiveIconVariants> {
  children?: React.ReactNode
  label?: string
  icon?: React.ReactNode
}

const FiveIcon = React.forwardRef<HTMLSpanElement, FiveIconProps>(
  ({ children, icon, size = "md", variant = "primary", label, className, ...props }, ref) => {
    return (
      <span ref={ref} className={cn("inline-flex items-center gap-2", className)} {...props}>
        {icon ? (
          <span className={cn(fiveIconVariants({ size, variant }))}>{icon}</span>
        ) : (
          <span className={cn(fiveIconVariants({ size, variant }))}>{children}</span>
        )}
        {label ? <span className="text-sm text-foreground">{label}</span> : null}
      </span>
    )
  }
)
FiveIcon.displayName = "FiveIcon"

export { FiveIcon, fiveIconVariants }