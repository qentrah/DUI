import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const bannerVariants = cva(
  "flex items-start gap-3 p-4 rounded-lg border transition-all",
  {
    variants: {
      variant: {
        default: "bg-background border-border text-foreground",
        primary: "bg-primary/10 border-primary/20 text-primary",
        secondary: "bg-secondary/10 border-secondary/20 text-secondary",
        success: "bg-green-50 border-green-200 text-green-800 dark:bg-green-950 dark:border-green-900 dark:text-green-200",
        warning: "bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-950 dark:border-amber-900 dark:text-amber-200",
        danger: "bg-red-50 border-red-200 text-red-800 dark:bg-red-950 dark:border-red-900 dark:text-red-200",
        info: "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-950 dark:border-blue-900 dark:text-blue-200",
      },
      size: {
        sm: "p-3 text-sm",
        md: "p-4 text-sm",
        lg: "p-5 text-base",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  }
)

const bannerIconVariants = cva(
  "flex-shrink-0 mt-0.5",
  {
    variants: {
      variant: {
        default: "text-foreground",
        primary: "text-primary",
        secondary: "text-secondary",
        success: "text-green-600 dark:text-green-400",
        warning: "text-amber-600 dark:text-amber-400",
        danger: "text-red-600 dark:text-red-400",
        info: "text-blue-600 dark:text-blue-400",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

export interface BannerProps extends VariantProps<typeof bannerVariants> {
  /** Banner title */
  title?: string
  /** Banner description/content */
  description?: string
  /** Leading icon */
  icon?: React.ReactNode
  /** Action button */
  action?: React.ReactNode
  /** Whether banner is dismissible */
  dismissible?: boolean
  /** Dismiss handler */
  onDismiss?: () => void
  /** Custom className */
  className?: string
  /** Banner content (when title/description pattern isn't used) */
  children?: React.ReactNode
}

function Banner({
  title,
  description,
  icon,
  action,
  variant,
  size,
  dismissible,
  onDismiss,
  className,
  children,
}: BannerProps) {
  return (
    <div className={cn(bannerVariants({ variant, size, className }))}>
      {icon && (
        <div className={cn(bannerIconVariants({ variant }))}>
          {icon}
        </div>
      )}
      
      <div className="flex-1 min-w-0">
        {children ? (
          children
        ) : (
          <>
            {title && (
              <h4 className="font-semibold mb-1">{title}</h4>
            )}
            {description && (
              <p className={cn("opacity-90", title ? "mt-1" : "")}>
                {description}
              </p>
            )}
          </>
        )}
      </div>

      {action && (
        <div className="flex-shrink-0 mt-0.5">
          {action}
        </div>
      )}

      {dismissible && onDismiss && (
        <button
          onClick={onDismiss}
          className="flex-shrink-0 mt-0.5 text-current hover:opacity-70 transition-opacity"
          aria-label="Dismiss banner"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  )
}

// Predefined banner icons
const BannerIcons = {
  success: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2l4-4m6 2a9 9 0 11-18 0a9 9 0 0118 0z" />
    </svg>
  ),
  warning: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.93 4h13.86c1.54 0 2.5-1.66 1.73-3L13.73 5c-.77-1.34-2.69-1.34-3.46 0L3.34 16c-.77 1.34.19 3 1.73 3z" />
    </svg>
  ),
  danger: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0a9 9 0 0118 0z" />
    </svg>
  ),
  info: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0a9 9 0 0118 0z" />
    </svg>
  ),
}

Banner.displayName = "Banner"

export { Banner, bannerVariants, BannerIcons }