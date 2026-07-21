import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "alert relative w-full rounded-2xl p-4 shadow-md border transition-colors",
  {
    variants: {
      variant: {
        primary: "border-border bg-card text-foreground",
        secondary: "border-border bg-secondary text-secondary-foreground",
        success: "border-success-border bg-success-bg text-success",
        warning: "border-warning-border bg-warning-bg text-warning",
        danger: "border-destructive-border bg-destructive-bg text-destructive",
        "danger-soft": "border-destructive-border bg-destructive-bg text-destructive",
      },
    },
    defaultVariants: { variant: "primary" },
  }
)

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {}

function Alert({ className, variant, ...props }: AlertProps) {
  return <div role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
}
Alert.displayName = "Alert"

function AlertTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h5 className={cn("mb-1 font-semibold leading-none tracking-tight text-foreground", className)} {...props} />
}
AlertTitle.displayName = "AlertTitle"

function AlertDescription({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("text-sm [&_p]:leading-relaxed text-muted-foreground", className)} {...props} />
}
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription, alertVariants }